module.exports = {
  prompt: async ({ prompter, args }) => {
    let { opt } = await prompter.prompt({
      type: "input",
      name: "opt",
      message: `What's your option ?
    1. Create Table
    2. Add Column
    3. Add Index
    4. Remove Column
    5. Create Text Search
    6. Update Constraint
          `,
    });

    const optionObject = {
      "1": "create_table",
      "2": "add_col",
      "3": "add_index",
      "4": "remove_col",
      "5": "text_search",
      "6": "update_constraint",
    };

    let name = optionObject[opt];
    args.name = name;

    let { tbl_name } = await prompter.prompt({
      type: "input",
      name: "tbl_name",
      message: "What's your table's name?",
    });

    if (args.name === "update_constraint") {
      let { tbl_col } = await prompter.prompt({
        type: "input",
        name: "tbl_col",
        message: `What's your column's name?`,
      });
      let { ftable } = await prompter.prompt({
        type: "input",
        name: "ftable",
        message: `What's your foreign table's name?`,
      });
      let { fcol } = await prompter.prompt({
        type: "input",
        name: "fcol",
        message: `What's your foreign column's name?`,
      });

      return { name, tbl_name, tbl_col, ftable, fcol };
    } else if (
      args.name === "remove_col" ||
      args.name === "add_col" ||
      args.name === "add_index"
    ) {
      let { tbl_col } = await prompter.prompt({
        type: "input",
        name: "tbl_col",
        message: `What's your column's name?`,
      });

      return { name, tbl_name, tbl_col, ftable: null, fcol: null };
    } else {
      return { name, tbl_name, tbl_col: null, ftable: null, fcol: null };
    }
  },
};
