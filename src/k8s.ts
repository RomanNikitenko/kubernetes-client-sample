import * as k8s from '@kubernetes/client-node';

let k8sConfig: k8s.KubeConfig;
let coreV1API: k8s.CoreV1Api;
console.info('==== TEST K8S API === ');

function getCoreApi(): k8s.CoreV1Api {
  if (!coreV1API) {
    k8sConfig = new k8s.KubeConfig();
    k8sConfig.loadFromCluster();
    coreV1API = k8sConfig.makeApiClient(k8s.CoreV1Api);
  }
  return coreV1API;
}

async function getPod(): Promise<Array<k8s.V1Secret>> {
  const coreV1API = getCoreApi();
  const namespace = process.env.DEVWORKSPACE_NAMESPACE;
  console.log('=== NAMESPACE: ', namespace);
  if (!namespace) {
    throw new Error('Can not get a pod: DEVWORKSPACE_NAMESPACE env variable is not defined');
  }

  try {
    const { body } = await coreV1API.listNamespacedPod(namespace, undefined, undefined, undefined, undefined, undefined);

    console.log('=== POD ITEMS: ');
    console.dir(body.items, { depth: 2 });

    return body.items;
  } catch (error) {
    console.log('=== ERROR: ');
    console.dir(error);
    return [];
  }
}

getPod();