// npm install fs mysql

const mysql = require('mysql2');
const fs = require('fs');
//const Parser = require('binary-parser').Parser;

// Configurações de conexão com o banco de dados
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'readremessa'
});

connection.connect(function(err) {
  if (err) throw err;
  console.log('Conexão com o banco de dados estabelecida!');
});

// Abre o arquivo CNAB240 para leitura
const fileData = fs.readFileSync('C:\Users\athos\OneDrive\Documentos\BoletoReadWriteProject-main\hotfolder\cnab240-caixa.txt');
const lines = fileData.split('\r\n');

lines.forEach(lines => {
  if (lines.startsWith('0')) {
    remessasBancarias.push({
      codigoBanco: lines.substr(0, 3),
      codigoLote: lines.substr(3, 4),
      tipoRegistro: lines.substr(7, 1),
      filler: lines.substr(8, 9),
      tipoInscricaoBeneficiario: lines.substr(17, 1),
      numeroInscricaoBeneficiario: registro.substr(18, 14),
      usoCaixaZeros: registro.substr(32, 20),
      agenciaMantenedoraConta : registro.substr(52, 5),
      digitoVerificadorAgencia: registro.substr(57, 1),
      codigoBeneficiario: registro.substr(58, 7),
      usoCaixaZeros2: registro.substr(65, 7),
      nomeEmpresa: registro.substr(72, 30),
      nomeBanco: registro.substr(102, 30),
      filler2: registro.substr(132, 10),
      codigoRemessa: registro.substr(142, 1),
      dataGeracaoArquivo: registro.substr(143, 8),
      horaGeracaoArquivo: registro.substr(151, 6),
      nsa: registro.substr(157, 6),
      numVersaoLayout: registro.substr(163, 3),
      densidadeGravArquivo: registro.substr(166, 5),
      filler3: registro.substr(171, 20),
      situacaoArquivo: registro.substr(191, 20),
      usoInterno: registro.substr(211, 4),
      filler4: registro.substr(215, 25)
    });
  }
});


// const remessaParser = new Parser()
//   .endianess('big')
//   .uint8('codigoRegistro')
//   .uint8('codigoRemessa')
//   .string('codigoServico', { length: 2 })
//   .string('agenciaMantenedora', { length: 4 })
//   .string('digitoVerificadorAgencia', { length: 1 })
//   .string('numeroContaCorrente', { length: 8 })
//   .string('digitoVerificadorConta', { length: 1 })
//   .string('digitoVerificadorAgenciaConta', { length: 1 })
//   .string('nomeEmpresa', { length: 30 })
//   .string('codigoBanco', { length: 3 })
//   .string('nomeBanco', { length: 15 })
//   .string('dataGeracaoArquivo', { length: 8 })
//   .string('horaGeracaoArquivo', { length: 6 })
//   .string('numeroSequencialArquivo', { length: 6 })
//   .string('versaoLayout', { length: 3 })
//   .string('densidadeGravacao', { length: 5 })
//   .string('reservadoBanco', { length: 20 })
//   .string('reservadoEmpresa', { length: 20 });

//   const remessa = remessaParser.parse(data);

//   const remessaObj = {
//     codigoRegistro: remessa.codigoRegistro,
//     codigoRemessa: remessa.codigoRemessa,
//     codigoServico: remessa.codigoServico,
//     agenciaMantenedora: remessa.agenciaMantenedora,
//     digitoVerificadorAgencia: remessa.digitoVerificadorAgencia,
//     numeroContaCorrente: remessa.numeroContaCorrente,
//     digitoVerificadorConta: remessa.digitoVerificadorConta,
//     digitoVerificadorAgenciaConta: remessa.digitoVerificadorAgenciaConta,
//     nomeEmpresa: remessa.nomeEmpresa,
//     codigoBanco: remessa.codigoBanco,
//     nomeBanco: remessa.nomeBanco,
//     dataGeracaoArquivo: remessa.dataGeracaoArquivo,
//     horaGeracaoArquivo: remessa.horaGeracaoArquivo,
//     numeroSequencialArquivo: remessa.numeroSequencialArquivo,
//     versaoLayout: remessa.versaoLayout,
//     densidadeGravacao: remessa.densidadeGravacao,
//     reservadoBanco: remessa.reservadoBanco,
//     reservadoEmpresa: remessa.reservadoEmpresa,
//   };

  console.log(remessaObj);

  // Insere as informações na tabela do banco de dados
  connection.query(`INSERT INTO remessa (campo1, campo2, campo3, ...) VALUES (?, ?, ?, ...)`, [campo1, campo2, campo3], (error, results, fields) => {
    if (error) throw error;
    console.log('Linha inserida com sucesso!');
  });

  const insertQuery = 'INSERT INTO readremessa (tipo_registro, cnpj_empresa, numero_lote, tipo_operacao, tipo_servico, versao_layout, brancos1, quantidade_reg)'

// Fecha a conexão com o banco de dados quando a leitura do arquivo terminar
connection.end();