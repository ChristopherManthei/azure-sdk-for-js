/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import {
  env,
  record,
  RecorderEnvironmentSetup,
  Recorder
} from "@azure-tools/test-recorder";
import * as assert from "assert";
import { ClientSecretCredential } from "@azure/identity";
import { ContainerRegistryManagementClient } from "../src/containerRegistryManagementClient";

const recorderEnvSetup: RecorderEnvironmentSetup = {
  replaceableVariables: {
    AZURE_CLIENT_ID: "azure_client_id",
    AZURE_CLIENT_SECRET: "azure_client_secret",
    AZURE_TENANT_ID: "88888888-8888-8888-8888-888888888888",
    SUBSCRIPTION_ID: "azure_subscription_id"
  },
  customizationsOnRecordings: [
    (recording: any): any =>
      recording.replace(
        /"access_token":"[^"]*"/g,
        `"access_token":"access_token"`
      )
  ],
  queryParametersToSkip: []
};

describe("ContainerRegistry test", () => {
  let recorder: Recorder;
  let subscriptionId: string;
  let client: ContainerRegistryManagementClient;
  let location: string;
  let resourceGroup: string;
  let registryName: string;
  let importPipelineName: string;
  let exportPipelineName: string;
  let taskName: string

  beforeEach(async function() {
    recorder = record(this, recorderEnvSetup);
    subscriptionId = env.SUBSCRIPTION_ID;
    // This is an example of how the environment variables are used
    const credential = new ClientSecretCredential(
      env.AZURE_TENANT_ID,
      env.AZURE_CLIENT_ID,
      env.AZURE_CLIENT_SECRET
    );
    client = new ContainerRegistryManagementClient(credential, subscriptionId);
    location = "eastus";
    resourceGroup = "myjstest";
    registryName = "myregistryxxxyy";
    importPipelineName = "myimportpipelinexxx";
    exportPipelineName = 'myexportpipelinexxx';
    taskName = "mytaskxxx";
  });

  afterEach(async function() {
    await recorder.stop();
  });

  it("registries create test", async function() {
    const res = await client.registries.beginCreateAndWait(resourceGroup,registryName,{
        location: location,
          tags: {
              key: "value"
          },
          sku: {
              name: "Premium"
          },
          adminUserEnabled: false
      });
      assert.equal(res.name,registryName)
  });

  it("importPipelines create test", async function() {
    const res = await client.importPipelines.beginCreateAndWait(resourceGroup,registryName,importPipelineName,{
      location: location,
        identity: {
            type: "SystemAssigned"
        },
        source: {
            type: "AzureStorageBlobContainer",
            uri: "https://accountname.blob.core.windows.net/containername",
            keyVaultUri: "https://myvault.vault.azure.net/secrets/acrimportsas"
        },
        options: [
            "OverwriteTags",
            "DeleteSourceBlobOnSuccess",
            "ContinueOnErrors"
        ]
    });
    assert.equal(res.name,importPipelineName)
  });

  it("exportPipelines create test", async function() {
    const res = await client.exportPipelines.beginCreateAndWait(resourceGroup,registryName,exportPipelineName,{
      location: location,
        identity: {
            type: "SystemAssigned"
        },
        target: {
            type: "AzureStorageBlobContainer",
            uri: "https://accountname.blob.core.windows.net/containername",
            keyVaultUri: "https://myvault.vault.azure.net/secrets/acrexportsas"
        },
        options: [
            "OverwriteBlobs"
        ]
    });
    assert.equal(res.name,exportPipelineName);
  });

  it("importPipelines get test", async function() {
    const res = await client.importPipelines.get(resourceGroup,registryName,importPipelineName);
    assert.equal(res.name,importPipelineName)
  });

  it("exportPipelines get test", async function() {
    const res = await client.exportPipelines.get(resourceGroup,registryName,exportPipelineName);
    assert.equal(res.name,exportPipelineName)
  });

  it("importPipelines list test", async function() {
    const resArray = new Array();
    for await (let item of client.importPipelines.list(resourceGroup,registryName)){
        resArray.push(item);
    }
    assert.equal(resArray.length,1);
  });

  it("exportPipelines list test", async function() {
    const resArray = new Array();
    for await (let item of client.exportPipelines.list(resourceGroup,registryName)){
        resArray.push(item);
    }
    assert.equal(resArray.length,1);
  });

  it("importPipelines delete test", async function() {
    const res = await client.importPipelines.beginDeleteAndWait(resourceGroup,registryName,importPipelineName);
    const resArray = new Array();
    for await (let item of client.importPipelines.list(resourceGroup,registryName)){
        resArray.push(item);
    }
    assert.equal(resArray.length,0);
  });

  it("exportPipelines delete test", async function() {
    const res = await client.exportPipelines.beginDeleteAndWait(resourceGroup,registryName,exportPipelineName);
    const resArray = new Array();
    for await (let item of client.exportPipelines.list(resourceGroup,registryName)){
        resArray.push(item);
    }
    assert.equal(resArray.length,0);
  });

  it("tasks create test", async function() {
    const res = await client.tasks.beginCreateAndWait(resourceGroup,registryName,taskName,{
      location: location,
      tags: {
          testkey: "value"
      },
      status: "Enabled",
      platform: {
          os: "Linux",
          architecture: "amd64"
      },
      agentConfiguration: {
          cpu: 2
      },
      step: {
          type: "Docker",
          contextPath: "https://github.com/SteveLasker/node-helloworld",
          imageNames: ["testtask:v1"],
          dockerFilePath: "DockerFile",
          isPushEnabled: true,
          noCache: false
      },
      trigger: {
          baseImageTrigger: {
              name: "myBaseImageTrigger",
              baseImageTriggerType: "Runtime",
              updateTriggerPayloadType: "Default",
              status: "Enabled"
          }
      }
    });
    assert.equal(res.name,taskName);
  });

  it("tasks get test", async function() {
    const res = await client.tasks.get(resourceGroup,registryName,taskName);
    assert.equal(res.name,taskName);
  });

  it("tasks list test", async function() {
    const resArray = new Array();
    for await (let item of client.tasks.list(resourceGroup,registryName)){
        resArray.push(item);
    }
    assert.equal(resArray.length,1);
  });

  it("tasks update test", async function() {
    const res = await client.tasks.beginUpdateAndWait(resourceGroup,registryName,taskName,{
      tags: {
          testkey: "value"
      },
      status: "Enabled",
      platform: {
          os: "Linux",
          architecture: "amd64"
      },
      agentConfiguration: {
          cpu: 2
      },
      step: {
          type: "Docker",
          contextPath: "https://github.com/SteveLasker/node-helloworld",
          imageNames: ["testtask:v1"],
          dockerFilePath: "DockerFile",
          isPushEnabled: true,
          noCache: false
      },
      trigger: {
          baseImageTrigger: {
              name: "myBaseImageTrigger",
              baseImageTriggerType: "Runtime",
              updateTriggerPayloadType: "Default",
              status: "Enabled"
          }
      }
    });
    assert.equal(res.type,"Microsoft.ContainerRegistry/registries/tasks");
  });

  it("tasks delete test", async function() {
    const res = await client.tasks.beginDeleteAndWait(resourceGroup,registryName,taskName);
    const resArray = new Array();
    for await (let item of client.tasks.list(resourceGroup,registryName)){
        resArray.push(item);
    }
    assert.equal(resArray.length,0);
  });

  it("registries delete test", async function() {
    const res = await client.registries.beginDeleteAndWait(resourceGroup,registryName);
  });
});
