$(function() {
  var validateOptions = {
    errorElement: 'span',
    errorPlacement: function(error, element) {
      error.insertAfter(element);
    },
    rules: {
      'quantity': { required: true },
      'name': { required: true },
      'email': { required:true, email: true },
      'cpf': { required:true },
      'birthdate': { required:true },
      'phone': { required:true },
      'cep': { required:true },
      'address': { required:true },
      'number': { required:true },
      'district': { required:true },
      'city': { required:true },
      'state': { required:true },
      'card-name': { required:true },
      'card-number': { required:true },
      'card-date': { required:true },
    },
    messages: {
      'quantity': { required: 'Este campo é obrigatório' },
      'name': { required: 'Este campo é obrigatório' },
      'email': { required: 'Este campo é obrigatório', email: 'Não é um endereço de email válido' },
      'cpf': { required: 'Este campo é obrigatório' },
      'birthdate': { required: 'Este campo é obrigatório' },
      'phone': { required: 'Este campo é obrigatório' },
      'cep': { required: 'Este campo é obrigatório' },
      'address': { required: 'Este campo é obrigatório' },
      'number': { required: 'Este campo é obrigatório' },
      'district': { required: 'Este campo é obrigatório' },
      'city': { required: 'Este campo é obrigatório' },
      'state': { required: 'Este campo é obrigatório' },
      'card-name': { required: 'Este campo é obrigatório' },
      'card-number': { required: 'Este campo é obrigatório' },
      'card-date': { required: 'Este campo é obrigatório' },
    }
  };
  $('#first-form').validate(validateOptions);
  $('#second-form').validate(validateOptions);

  var fillDonationField = function(value) {
    $('#quantity').focus().val(value);
    checkQuantity();
  }

  var checkQuantity = function() {
    if ( $('#quantity').val() ) {
      $('#value-chooser').fadeOut(400);
      $('#name-section').delay(400).fadeIn(400);
    } else {
      $('#name-section').fadeOut(400);
      $('#value-chooser').delay(400).fadeIn(400);
    }
  }

  $('.button-collapse').sideNav();

  $('#donate-30').click(function() { fillDonationField('30,00') });
  $('#donate-40').click(function() { fillDonationField('40,00') });
  $('#donate-50').click(function() { fillDonationField('50,00') });
  $('#donate-75').click(function() { fillDonationField('75,00') });
  $('#donate-100').click(function() { fillDonationField('100,00') });
  $('#donate-150').click(function() { fillDonationField('150,00') });

  $('.currency').mask("#.##0,00", { reverse: true });
  $('.cpf').mask("000.000.000-00");
  $('.date').mask("00/00/0000");
  $('.phone').mask("(00) 000000009");
  $('.cep').mask("00000-000");
  $('.number').mask("0#");
  $('.credit-card').mask("0000 0000 0000 0000");
  $('.credit-card-date').mask("00/00");

  $('#quantity').keyup(function() {
    checkQuantity();
  });
});
