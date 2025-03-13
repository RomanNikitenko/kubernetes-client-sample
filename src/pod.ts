import * as k8s from '@kubernetes/client-node';
import { getCoreApi } from './k8s';

console.info('==== TEST GET POD === ');

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