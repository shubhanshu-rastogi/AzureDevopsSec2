// telemetry/appinsights-reporter.ts
import type {
  Reporter,
  FullConfig,
  Suite,
  TestCase,
  TestResult,
  FullResult,
  TestError
} from '@playwright/test/reporter';



import { initTelemetry, trackEvent, trackMetric, trackException } from './appinsights';

class AppInsightsReporter implements Reporter {
  onBegin(config: FullConfig, suite: Suite) {
    initTelemetry(); // reads APPINSIGHTS_CONNECTION_STRING
    trackEvent('pw.run.begin', { totalTests: suite.allTests().length });
  }

  onTestBegin(test: TestCase) {
    trackEvent('pw.test.begin', {
      title: test.title,
      file: test.location.file,
      project: test.parent?.project()?.name || '',
    });
  }

  onTestEnd(test: TestCase, result: TestResult) {
    const durationMs = result.duration;
    const status = result.status;

    trackMetric('pw.test.duration.ms', durationMs, {
      title: test.title,
      file: test.location.file,
      project: test.parent?.project()?.name || '',
      status,
    });

    trackEvent('pw.test.end', {
      title: test.title,
      file: test.location.file,
      project: test.parent?.project()?.name || '',
      status,
      retries: result.retry,
    });

    if (status !== 'passed') {
      const err: TestError | undefined = result.errors?.[0];
      if (err) {
        const e = new Error(err.message || 'Test failed');
        trackException(e, {
          title: test.title,
          file: test.location.file,
          project: test.parent?.project()?.name || '',
          status,
        });
      }
    }
  }

  onEnd() {
    trackEvent('pw.run.end');
  }
}

export default AppInsightsReporter;
