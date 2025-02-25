const { NodeSDK } = require("@opentelemetry/sdk-node");
const { ConsoleSpanExporter } = require("@opentelemetry/sdk-trace-node");
const {
  ATTR_SERVICE_NAME,
  ATTR_SERVICE_VERSION,
} = require("@opentelemetry/semantic-conventions");
const { Resource } = require("@opentelemetry/resources");
const { name, version } = require("./package.json");
const { trace } = require("@opentelemetry/api");
const {
  OTLPTraceExporter,
} = require("@opentelemetry/exporter-trace-otlp-proto");

const sdk = new NodeSDK({
  resource: new Resource({
    [ATTR_SERVICE_NAME]: name,
    [ATTR_SERVICE_VERSION]: version,
  }),
  resourceDetectors: [],
  traceExporter: new ConsoleSpanExporter(),
  //traceExporter: new OTLPTraceExporter(),
});

sdk.start();

const tracer = trace.getTracer(name, version);

setInterval(() => {
  tracer.startActiveSpan("count to a million", (span) => {
    for (let i = 0; i < 1000000; i++) {}
    span.end();
  });
}, 2000);
