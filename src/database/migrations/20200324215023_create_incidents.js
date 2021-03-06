
exports.up = function(knex) {
    return knex.schema.createTable('incidents', function (table) {
      table.increments(); // cria chave primária com auto incremento
      table.string('title').notNullable();
      table.string('description').notNullable();
      table.decimal('value').notNullable();
      // relacionamento com a ong
      table.string('ong_id').notNullable();
      table.foreign('ong_id').references('id').inTable('ongs'); // constraind
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('incidents');
  };
  