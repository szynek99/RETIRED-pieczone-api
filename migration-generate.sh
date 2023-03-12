cat > ./src/db/migrations/$(date +"%Y%m%d%H%M%S")-$1.ts << EOF
/* eslint-disable linebreak-style */
/* eslint-disable import/no-import-module-exports */
import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
  // tslint:disable-next-line:variable-name
  up: async (queryInterface: QueryInterface) => {
  // Write migration code here.
  },

  // tslint:disable-next-line:variable-name
  down: async (queryInterface: QueryInterface) => {
  // If migration fails, this will be called. Rollback your migration changes.
  },
};
EOF