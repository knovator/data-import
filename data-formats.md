### Validations

#### Create User
| Name | Type | Validations | Description
| --- | --- | ----------- | ----------- |
| `firstName` | `string` | Required | |
| `lastName` | `string` | Required | |
| `userName` | `string` | Required | |
| `emails` | `Array of { email: string, verified: boolean }` |  | |
| `tels` | `Array of { phn: string, verified: boolean, countryCode: string }` | Required | |
| `password` | `string` | Required | |
| `picture` | `string` |  | |
| `lL` | `string`| | |
| `settings` | `string` | | |
| `verified` | `boolean` | | |
| `active` | `boolean` | | |
| `timeZone` | `string` | Required | |
| `lastLogin` | `string` | | |
| `roles` | `Array of { name: string, code: string }` | | |

#### Create Project
| Name | Type | Validations | Description |
| --- | --- | ----------- | ----------- |
| `nm` | `string` | Required | Name of Project |
| `cd` | `string` | Required | Code of Project |
| `cbUrl` | `string` |  | Callback Url |
| `u` | `Object of { userId: ObjectId, userName: string }` |  |  |

### Schemas

#### Template Schema
| Name | Type | Validations | Description | Alias |
| --- | --- | ----------- | ----------- | ---- |
| `nm` | `string` | Required, Unique | Name of Template | name |
| `cd` | `string` | Unique | Code of Template | code |
| `cb` | `Object of { m: string, u: string }` |  | Callback Method(`m`) and Url(`u`) | |
| `cs` | `number` |  | Data Chunk Size | chunkSize |
| `p` | `Object of { cd: string, id: ObjectId, nm: Name }` |  | Project information as Project Code(`cd`), Id(`id`) and Name(`nm`) | |
| `sample` | `Object` |  | Sample [file](#file-schema) information | |

#### File Schema
| Name | Type | Validations | Description |
| --- | --- | ----------- | ----------- |
| `fNm` | `string` |  | FileName |
| `oNm` | `string` |  | Original Name |
| `enc` | `string` |  | Encoding |
| `path` | `string` | Path |
| `s` | `string` |  | size |
| `mT` | `string` |  | Mime Type  |

#### Column Schema
| Name | Type | Validations | Description |
| --- | --- | ----------- | ----------- |
| `tId` | `string` | Required | **Template** table reference Key |
| `nm` | `string` | Required | Name |
| `k` | `string` | | Key |
| `aK` | `string` | | Alternate Key |
| `r` | `boolean` | Required | is key Required  |
| `u` | `boolean` | Required | is key Unique  |
| `typ` | ``one of ('STRING', 'NUMBER', 'DATE', 'EMAIL', 'PHONE', 'GST', 'ANY', 'REGEX')`` | Required | Column Type  |
| `rgx` | `string` |  | Regular Expression to check  |
| `s` | `one of ('ACE', 'DCE', 'ANY')` |  | Sorting type |
| `t` | `one of ('UPPER', 'LOWER', 'ANY')` |  |  |
| `dcm` | `number` |  | Decimal  |
| `seq` | `number` | Required | Sequence |

#### Project Schema
| Name | Type | Validations | Description | Alias |
| --- | --- | ----------- | ----------- | ---- |
| `nm` | `string` | Required, Unique | Name of Project | name |
| `cd` | `string` | Unique | Code of Project | code |
| `cbUrl` | `string` | | Callback Url to send data | callbackUrl |
| `u` | `object of { uid: string, uNm: string }` | | UserId and UserName | |

#### User Schema
| Name | Type | Validations | Description | Alias |
| --- | --- | ----------- | ----------- | ---- |
| `fNm` | `string` |  | Fist Name |  |
| `lNm` | `string` |  | Last Name |  |
| `uNm` | `string` |  | User Name |  |
| `emails` | `Array of { email: string, v: boolean }` | Array of `email` and verified(`v`) data |  |
| `tels` | `Array of { phn: string, v: boolean, cc: string  }` |  | Array of Phone(`phn`), Verified(`v`) and CountryCode(`cc`) |  |
| `pwd` | `string` |  | Password |  |
| `img` | `string` |  | Image | |
| `tz` | `string` |  | Timezone, default is (`Asia/Calcutta|Asia/Kolkata`) |  |
| `lL` | `Date` |  | Last Login |  |
| `stg` | `string` |  | Settings | settings |
| `v` | `string` |  | Verified | verified |
| `a` | `string` |  | Active | active |
| `r` | `Array of [Roles]` |  | Roles | roles |

#### Roles Schema
| Name | Type | Validations | Description | Alias |
| --- | --- | ----------- | ----------- | ---- |
| `nm` | `string` | Required, Unique | Name of Role | name |
| `cd` | `string` | Unique | Code of Role | code |
| `w` | `string` |  | Weight of role in hierarchy | weight |
| `a` | `boolean` |  | Is role active | active |