var AutoCep = {
  _neighborhood_input: "bairro",
  _zipcode_input: "cep",
  _street_input: "logradouro",
  _state_input: "estado",
  _city_input: "cidade",
  _district_input: "bairro",
  _viacep_result: {},
  _url: "https://viacep.com.br/ws/",
  _data_type: "json",
  _auto_cep: "data-auto-cep",
  _auto_cep_label: "data-auto-cep-label",
  _zipcode: undefined,
  init: function() {
    AutoCep._zipcode_input = document.querySelector("[" + AutoCep._auto_cep + "=cep]");
    AutoCep._zipcode_input.addEventListener('keyup', AutoCep._clear_zipcode);
  },
  _clear_zipcode: function() {
    AutoCep._zipcode = AutoCep._zipcode_input.value;

    if (AutoCep._zipcode === undefined || AutoCep._zipcode === '' || AutoCep._zipcode === null) return false;

    AutoCep._zipcode = AutoCep._zipcode.replace('-', '');
    if (AutoCep._zipcode.length !== 8) return false;
    AutoCep._execute_api();
  },
  _execute_api: function() {
    var url = AutoCep._url + AutoCep._zipcode + "/" + AutoCep._data_type;
    var req = new XMLHttpRequest();
    req.onreadystatechange = function() {
      if (req.readyState === XMLHttpRequest.DONE) {
        if (req.status === 200) {
          AutoCep._viacep_result = JSON.parse(req.response);
          AutoCep.flush();
        }
      }
    };
    req.open('GET', url, true);
    req.send();
  },
  flush: function() {
    AutoCep.getLogradouro = function() {
      return AutoCep._viacep_result.logradouro;
    };
    AutoCep.getBairro = function() {
      return AutoCep._viacep_result.localidade;
    };
    AutoCep.getUf = function() {
      return AutoCep._viacep_result.uf;
    };
    AutoCep.getBairro = function() {
      return AutoCep._viacep_result.bairro;
    };
    AutoCep.fillForm();
  },
  fillForm: function() {
    document.querySelector("[" + AutoCep._auto_cep + "=" + AutoCep._street_input + "]").value = AutoCep._viacep_result.logradouro;
    document.querySelector("[" + AutoCep._auto_cep + "=" + AutoCep._street_input + "]").disabled = true;
    document.querySelector("[" + AutoCep._auto_cep_label + "=" + AutoCep._street_input + "]").className = "active";
    document.querySelector("[" + AutoCep._auto_cep + "=" + AutoCep._district_input + "]").value = AutoCep._viacep_result.bairro;
    document.querySelector("[" + AutoCep._auto_cep + "=" + AutoCep._district_input + "]").disabled = true;
    document.querySelector("[" + AutoCep._auto_cep_label + "=" + AutoCep._district_input + "]").className = "active";
    document.querySelector("[" + AutoCep._auto_cep + "=" + AutoCep._city_input + "]").value = AutoCep._viacep_result.localidade;
    document.querySelector("[" + AutoCep._auto_cep + "=" + AutoCep._city_input + "]").disabled = true;
    document.querySelector("[" + AutoCep._auto_cep_label + "=" + AutoCep._city_input + "]").className = "active";
    document.querySelector("[" + AutoCep._auto_cep + "=" + AutoCep._state_input + "]").value = AutoCep._viacep_result.uf;
    document.querySelector("[" + AutoCep._auto_cep + "=" + AutoCep._state_input + "]").disabled = true;
    document.querySelector("[" + AutoCep._auto_cep_label + "=" + AutoCep._state_input + "]").className = "active";
  }
};
AutoCep.init();
