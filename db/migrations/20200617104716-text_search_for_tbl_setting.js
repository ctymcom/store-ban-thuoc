const vectorName = "_search";

// A: 1.0, B: 0.4, C: 0.2, D: 0.1
const searchObjects = {
  tbl_setting: [
    {
      key: "key",
      rank: "B",
    },
    {
      key: "name",
      rank: "C",
    },
  ],
};

module.exports = {
  up: (queryInterface) =>
    queryInterface.sequelize.transaction((t) =>
      Promise.all(
        Object.keys(searchObjects).map((table) =>
          queryInterface.sequelize
            .query(
              `
                ALTER TABLE ${table} ADD COLUMN ${vectorName} TSVECTOR;
              `,
              { transaction: t }
            )
            .then(() =>
              queryInterface.sequelize.query(
                `
                  CREATE INDEX ${table}_search ON ${table} USING gin(${vectorName});
                `,
                { transaction: t }
              )
            )
            .then(() =>
              queryInterface.sequelize.query(
                `
                CREATE FUNCTION ${table}_vector_trigger () RETURNS trigger AS $$
                begin
                  new.${vectorName} :=
                    ${searchObjects[table]
                      .map((t) => {
                        return `setweight(to_tsvector('usimple', coalesce(new.${t.key},'')), '${t.rank}')`;
                      })
                      .join(" || ")};
                  return new;
                end
                $$ LANGUAGE plpgsql;
            `,
                { transaction: t }
              )
            )
            .then(() =>
              queryInterface.sequelize.query(
                `
                CREATE TRIGGER ${table}_vector_update
                BEFORE INSERT OR UPDATE ON ${table}
                FOR EACH ROW EXECUTE PROCEDURE ${table}_vector_trigger();
              `,
                { transaction: t }
              )
            )
            .error(console.log)
        )
      )
    ),

  down: (queryInterface) =>
    queryInterface.sequelize.transaction((t) =>
      Promise.all(
        Object.keys(searchObjects).map((table) =>
          queryInterface.sequelize
            .query(
              `
          DROP TRIGGER ${table}_vector_update ON ${table};
        `,
              { transaction: t }
            )
            .then(() =>
              queryInterface.sequelize.query(
                `
                DROP INDEX ${table}_search;
              `,
                { transaction: t }
              )
            )
            .then(() =>
              queryInterface.sequelize.query(
                `
                DROP FUNCTION ${table}_vector_trigger
            `,
                { transaction: t }
              )
            )
            .then(() =>
              queryInterface.sequelize.query(
                `
                ALTER TABLE ${table} DROP COLUMN ${vectorName};
              `,
                { transaction: t }
              )
            )
        )
      )
    ),
};
