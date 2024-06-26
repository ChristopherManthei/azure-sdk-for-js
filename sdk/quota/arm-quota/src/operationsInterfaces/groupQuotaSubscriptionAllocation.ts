/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator } from "@azure/core-paging";
import {
  SubscriptionQuotaAllocations,
  GroupQuotaSubscriptionAllocationListOptionalParams,
  GroupQuotaSubscriptionAllocationGetOptionalParams,
  GroupQuotaSubscriptionAllocationGetResponse,
} from "../models";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a GroupQuotaSubscriptionAllocation. */
export interface GroupQuotaSubscriptionAllocation {
  /**
   * Gets all the quota allocated to a subscription for the specific Resource Provider, Location. This
   * will include the GroupQuota and total quota allocated to the subscription. Only the Group quota
   * allocated to the subscription can be allocated back to the MG Group Quota. Use the $filter parameter
   * to filter out the specific resource based on the ResourceProvider/Location. $filter is a required
   * parameter.
   * @param managementGroupId Management Group Id.
   * @param groupQuotaName The GroupQuota name. The name should be unique for the provided context
   *                       tenantId/MgId.
   * @param filter | Field | Supported operators
   *               |---------------------|------------------------
   *
   *                location eq {location}
   *                Example: $filter=location eq eastus
   * @param options The options parameters.
   */
  list(
    managementGroupId: string,
    groupQuotaName: string,
    filter: string,
    options?: GroupQuotaSubscriptionAllocationListOptionalParams,
  ): PagedAsyncIterableIterator<SubscriptionQuotaAllocations>;
  /**
   * Gets Quota allocated to a subscription for the specific Resource Provider, Location, ResourceName.
   * This will include the GroupQuota and total quota allocated to the subscription. Only the Group quota
   * allocated to the subscription can be allocated back to the MG Group Quota.
   * @param managementGroupId Management Group Id.
   * @param groupQuotaName The GroupQuota name. The name should be unique for the provided context
   *                       tenantId/MgId.
   * @param resourceName Resource name.
   * @param filter | Field | Supported operators
   *               |---------------------|------------------------
   *
   *                location eq {location}
   *                Example: $filter=location eq eastus
   * @param options The options parameters.
   */
  get(
    managementGroupId: string,
    groupQuotaName: string,
    resourceName: string,
    filter: string,
    options?: GroupQuotaSubscriptionAllocationGetOptionalParams,
  ): Promise<GroupQuotaSubscriptionAllocationGetResponse>;
}
