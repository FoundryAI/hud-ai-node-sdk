# Domain

| Attribute | Type | Description |
| --------- | ---- | ----------- |
| `id`         | String     | Resource ID **Cannot be edited** |
| `createdAt`  | Date       | Creation date **Cannot be edited** |
| `updatedAt`  | Date       | Last touch date **Cannot be edited** |
| `companyId`* | **String** | Associated company |
| `hostname`*  | **String** | FQDN e.g. `api.hud.ai` |

## `client.domains.list(params)`

| Param | Type |
|-------|------|
| `params`           | Object |
| `params.companyId` | string |
| `params.hostname`  | string |
| `params.limit`     | number |
| `params.offset`    | number |

## `client.domains.create(params)`

| Param | Type |
|-------|------|
| `params`            | Object |
| `params.companyId`* | **string** |
| `params.hostname`*  | **string** |

## `client.domains.get(id)`

| Param | Type |
|-------|------|
| `id` | string |

## `client.domains.update(id, params)`

| Param | Type |
|-------|------|
| `id`               | string |
| `params`           | Object |
| `params.companyId` | string |
| `params.hostname`  | string |

## `client.domains.destroy(id)`

| Param | Type |
|-------|------|
| `id` | string |
