// telemetry/appinsights.ts
import appInsights from 'applicationinsights';

let client: appInsights.TelemetryClient | null = null;

export function initTelemetry(connectionString?: string) {
  if (client) return client;

  const cs = connectionString || process.env.APPINSIGHTS_CONNECTION_STRING;
  if (!cs) return null;

  appInsights
    .setup(cs)
    .setAutoCollectRequests(false)
    .setAutoCollectDependencies(false)
    .setAutoCollectConsole(false)
    .setAutoCollectExceptions(false)
    .setAutoDependencyCorrelation(false)
    .setSendLiveMetrics(false)
    .setInternalLogging(false, false)
    .start();

  client = appInsights.defaultClient;

  // Helpful build metadata for slicing in KQL
  client.commonProperties = {
    ...(client.commonProperties || {}),
    buildId: process.env.BUILD_BUILDID || '',
    repo: process.env.BUILD_REPOSITORY_NAME || '',
    branch: process.env.BUILD_SOURCEBRANCHNAME || '',
  };

  return client;
}

export function trackEvent(name: string, properties: Record<string, any> = {}) {
  if (!client) initTelemetry();
  client?.trackEvent({ name, properties });
}

export function trackMetric(name: string, value: number, properties: Record<string, any> = {}) {
  if (!client) initTelemetry();
  client?.trackMetric({ name, value, properties });
}

export function trackException(error: Error, properties: Record<string, any> = {}) {
  if (!client) initTelemetry();
  client?.trackException({ exception: error, properties });
}
