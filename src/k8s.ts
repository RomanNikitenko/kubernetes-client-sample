import * as k8s from '@kubernetes/client-node';

let k8sConfig: k8s.KubeConfig;
let coreV1API: k8s.CoreV1Api;
let customObjectsApi: k8s.CustomObjectsApi;

export function getKubeConfig(): k8s.KubeConfig {
  if (!k8sConfig) {
    k8sConfig = new k8s.KubeConfig();
    k8sConfig.loadFromCluster();
    const currentCluster = k8sConfig.getCurrentCluster();
    console.info('=== current Cluster ', currentCluster?.server);
  }
  return k8sConfig;
}

export function getCoreApi(): k8s.CoreV1Api {
  if (!coreV1API) {
    const k8sConfig = getKubeConfig();
    coreV1API = k8sConfig.makeApiClient(k8s.CoreV1Api);
  }
  return coreV1API;
}

export function getCustomObjectsApi(): k8s.CustomObjectsApi {
  if (!customObjectsApi) {
    const k8sConfig = getKubeConfig();;
    customObjectsApi = k8sConfig.makeApiClient(k8s.CustomObjectsApi);
  }
  return customObjectsApi;
}
