/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import {
  AgentPool,
  HybridContainerServiceClient
} from "@azure/arm-hybridcontainerservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Updates the agent pool in the Hybrid AKS provisioned cluster
 *
 * @summary Updates the agent pool in the Hybrid AKS provisioned cluster
 * x-ms-original-file: specification/hybridaks/resource-manager/Microsoft.HybridContainerService/preview/2022-05-01-preview/examples/UpdateAgentPool.json
 */
async function updateAgentPool() {
  const subscriptionId = "a3e42606-29b1-4d7d-b1d9-9ff6b9d3c71b";
  const resourceGroupName = "test-arcappliance-resgrp";
  const provisionedClustersName = "test-hybridakscluster";
  const agentPoolName = "test-hybridaksnodepool";
  const agentPool: AgentPool = { count: 3, location: "westus" };
  const credential = new DefaultAzureCredential();
  const client = new HybridContainerServiceClient(credential, subscriptionId);
  const result = await client.agentPoolOperations.update(
    resourceGroupName,
    provisionedClustersName,
    agentPoolName,
    agentPool
  );
  console.log(result);
}

updateAgentPool().catch(console.error);