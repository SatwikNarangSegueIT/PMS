import { defineConfig } from "orval";

// Spec source: the backend's Swagger JSON. Point OPENAPI_URL at the running
// NestJS server (e.g. http://localhost:4000/api-json) or drop a copy in openapi/.
const input = process.env.OPENAPI_URL ?? "./openapi/openapi.json";

export default defineConfig({
  pms: {
    input: { target: input },
    output: {
      mode: "tags-split",
      target: "src/api/generated/endpoints",
      schemas: "src/api/generated/models",
      client: "react-query",
      httpClient: "fetch",
      clean: true,
      formatter: "prettier",
      override: {
        mutator: {
          path: "src/api/mutator/custom-fetch.ts",
          name: "customFetch",
        },
        fetch: {
          // Hooks return the response body directly; errors are thrown as ApiError.
          includeHttpResponseReturnType: false,
        },
        query: {
          useQuery: true,
          useMutation: true,
          signal: true,
        },
      },
    },
  },
});
