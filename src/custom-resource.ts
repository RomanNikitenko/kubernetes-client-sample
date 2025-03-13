import * as k8s from '@kubernetes/client-node';
import { getCustomObjectsApi } from './k8s';

const GROUP = 'org.eclipse.che';
const VERSION = 'v2';
const PLURAL = 'checlusters';

console.info('==== TEST Custom Object === ');

async function getCustomObject() {
  const customObjectsApi = getCustomObjectsApi();
  try {
    const { body } = await customObjectsApi.listClusterCustomObject(GROUP, VERSION, PLURAL);

    console.log('=== Custom Object ITEMS: ');
    console.dir(body, { depth: 2 });
  } catch (error) {
    console.error('=== ERROR ', error);
  }
}

getCustomObject();