import * as migration_20261003_143549_add_media_object_key from './20261003_143549_add_media_object_key'
import * as migration_20261003_143550_add_users_reset_password_requested_at from './20261003_143550_add_users_reset_password_requested_at'
import * as migration_20261004_160000_consolidate_pages from './20261004_160000_consolidate_pages'

export const migrations = [
  {
    up: migration_20261003_143549_add_media_object_key.up,
    down: migration_20261003_143549_add_media_object_key.down,
    name: '20261003_143549_add_media_object_key',
  },
  {
    up: migration_20261003_143550_add_users_reset_password_requested_at.up,
    down: migration_20261003_143550_add_users_reset_password_requested_at.down,
    name: '20261003_143550_add_users_reset_password_requested_at',
  },
  {
    up: migration_20261004_160000_consolidate_pages.up,
    down: migration_20261004_160000_consolidate_pages.down,
    name: '20261004_160000_consolidate_pages',
  },
]
