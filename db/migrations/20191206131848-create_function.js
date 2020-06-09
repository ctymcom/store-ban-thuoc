"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.sequelize.query(`
    CREATE OR REPLACE FUNCTION vn_unaccent(text)
      RETURNS text
      LANGUAGE plpgsql
      AS $function$
      DECLARE
          input_string text := $1;
      BEGIN

      input_string := translate(input_string, 'áàãạảAÁÀÃẠẢăắằẵặẳĂẮẰẴẶẲâầấẫậẩÂẤẦẪẬẨ', 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
      input_string := translate(input_string, 'éèẽẹẻEÉÈẼẸẺêếềễệểÊẾỀỄỆỂ', 'eeeeeeeeeeeeeeeeeeeeeeee');
      input_string := translate(input_string, 'íìĩịỉIÍÌĨỊỈ', 'iiiiiiiiiii');
      input_string := translate(input_string, 'óòõọỏOÓÒÕỌỎôốồỗộổÔỐỒỖỘỔơớờỡợởƠỚỜỠỢỞ', 'ooooooooooooooooooooooooooooooooooo');
      input_string := translate(input_string, 'úùũụủUÚÙŨỤỦưứừữựửƯỨỪỮỰỬ', 'uuuuuuuuuuuuuuuuuuuuuuu');
      input_string := translate(input_string, 'ýỳỹỵỷYÝỲỸỴỶ', 'yyyyyyyyyyy');
      input_string := translate(input_string, 'dđĐD', 'dddd');

      return input_string;
    END;
    $function$
    `);
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.sequelize.query(
      `
      DROP FUNCTION vn_unaccent(text);
    `
    );
  },
};
