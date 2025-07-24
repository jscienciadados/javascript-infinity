document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('cadastro-form');
    const successMessage = document.getElementById('success-message');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        clearErrors();
        successMessage.textContent = '';

        try {
            // Coleta os dados do formulário
            const formData = {
                nome: document.getElementById('nome').value.trim(),
                usuario: document.getElementById('usuario').value.trim(),
                email: document.getElementById('email').value.trim(),
                senha: document.getElementById('senha').value.trim(),
                dataNascimento: document.getElementById('dataNascimento').value
            };

            // Chama a função central de validação
            validarFormulario(formData);

            // Se a validação passar sem lançar erros, exibe sucesso
            successMessage.textContent = 'Cadastro realizado com sucesso!';
            form.reset();

        } catch (error) {
            // Captura qualquer erro lançado pela função de validação
            if (error.field) {
                const errorElement = document.getElementById(`${error.field}-error`);
                if (errorElement) {
                    errorElement.textContent = error.message;
                }
            } else {
                console.error("Ocorreu um erro inesperado:", error);
                successMessage.textContent = "Ocorreu um erro inesperado. Tente novamente.";
            }
        }
    });

    /**
     * Função central que valida todos os campos do formulário.
     * Lança um objeto de erro se alguma validação falhar.
     * @param {object} data - Objeto contendo os valores dos campos do formulário.
     */
    function validarFormulario(data) {
        // Validação do campo Nome
        if (!data.nome) {
            throw { field: 'nome', message: 'O campo Nome é obrigatório.' };
        }
        // NOVA VALIDAÇÃO: Garante que o nome contenha apenas letras e espaços (incluindo acentos)
        if (!/^[A-Za-zÀ-ú\s]+$/.test(data.nome)) {
            throw { field: 'nome', message: 'O nome deve conter apenas letras e espaços.' };
        }

        // Validação do campo Usuário
        if (!data.usuario) {
            throw { field: 'usuario', message: 'O campo Usuário é obrigatório.' };
        }

        // Validação do campo Email
        if (!data.email) {
            throw { field: 'email', message: 'O campo Email é obrigatório.' };
        }
        if (!/^\S+@\S+\.\S+$/.test(data.email)) {
            throw { field: 'email', message: 'Por favor, insira um email válido.' };
        }

        // Validação do campo Senha
        if (!data.senha) {
            throw { field: 'senha', message: 'O campo Senha é obrigatório.' };
        }
        if (data.senha.length < 6) {
            throw { field: 'senha', message: 'A senha deve ter no mínimo 6 caracteres.' };
        }

        // Validação da Data de Nascimento
        if (!data.dataNascimento) {
            throw { field: 'dataNascimento', message: 'A Data de Nascimento é obrigatória.' };
        }
        
        const dataNascObj = new Date(data.dataNascimento);
        // NOVA VALIDAÇÃO: Verifica se a data inserida é um valor de data válido.
        // O input type="date" ajuda, mas esta é uma segurança extra.
        // isNaN(dataNascObj.getTime()) é a forma padrão de checar se um objeto Date é válido.
        if (isNaN(dataNascObj.getTime())) {
             throw { field: 'dataNascimento', message: 'Por favor, insira uma data válida.' };
        }
        
        if (!isOfAge(dataNascObj)) {
            throw { field: 'dataNascimento', message: 'Você deve ter 18 anos ou mais para se cadastrar.' };
        }
    }

    /**
     * Limpa todas as mensagens de erro exibidas no formulário.
     */
    function clearErrors() {
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(span => {
            span.textContent = '';
        });
    }

    /**
     * Verifica se a idade com base na data de nascimento é >= 18.
     * @param {Date} dataNasc - O objeto Date da data de nascimento.
     * @returns {boolean}
     */
    function isOfAge(dataNasc) {
        const hoje = new Date();
        let idade = hoje.getFullYear() - dataNasc.getFullYear();
        const mes = hoje.getMonth() - dataNasc.getMonth();

        if (mes < 0 || (mes === 0 && hoje.getDate() <= dataNasc.getDate())) {
            idade--;
        }

        return idade >= 18;
    }
});