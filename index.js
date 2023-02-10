console.log("yes i'm linked");
/*
Step 1;
 
Configurando credencial
 
As credenciais são chaves únicas com as quais identificamos uma integração na sua conta. 
Servem para capturar pagamentos em lojas virtuais e outras aplicações de forma segura.
 
*/
const mp = new MercadoPago("TEST-370ed3f9-1b96-41e3-be21-5c43825dab73"); // setando public key

/*
Step 2;
 
Adicionando formulário de pagamento
 
A captura dos dados do cartão é feita através do CardForm da biblioteca MercadoPago.js.
O CardForm se conectará ao formulário de pagamento HTML,
facilitando a obtenção e validação de todos os dados necessários para processar o pagamento.
 
O formulário de pagamento está presente e comentado no HTML.
 
*/

/*
Step 3;
 
Inicializando o formulário de pagamento

Após adicionar o formulário de pagamento, é preciso inicializá-lo. 
Esta etapa consiste em relacionar o ID de cada campo do formulário com os atributos correspondentes.
A biblioteca será responsável pelo preenchimento, obtenção e validação de todos os dados necessários no momento de confirmação do pagamento.

*/


const cardForm = mp.cardForm({

    amount: "6.6",
    iframe: true,

    form: {
        id: "form-checkout",
        cardNumber: {
            id: "form-checkout__cardNumber",
            placeholder: "Número do cartão",
        },

        expirationDate: {
            id: "form-checkout__expirationDate",
            placeholder: "MM/YY",
        },

        securityCode: {
            id: "form-checkout__securityCode",
            placeholder: "Código de segurança",
        },

        cardholderName: {
            id: "form-checkout__cardholderName",
            placeholder: "Titular do cartão",
        },

        issuer: {
            id: "form-checkout__issuer",
            placeholder: "Banco emissor",
        },

        installments: {
            id: "form-checkout__installments",
            placeholder: "Parcelas",
        },

        identificationType: {
            id: "form-checkout__identificationType",
            placeholder: "Tipo de documento",
        },
        identificationNumber: {
            id: "form-checkout__identificationNumber",
            placeholder: "Número do documento",
        },

        cardholderEmail: {
            id: "form-checkout__cardholderEmail",
            placeholder: "E-mail",
        },
    },
    callbacks: {
        onFormMounted: error => {
            if (error) return console.warn("Form Mounted handling error: ", error);
            console.log("Form mounted");
        },
        onSubmit: event => {
            event.preventDefault();

            const {
                paymentMethodId: payment_method_id,
                issuerId: issuer_id,
                cardholderEmail: email,
                amount,
                token,
                installments,
                identificationNumber,
                identificationType,
            } = cardForm.getCardFormData();

            fetch("/process_payment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    token,
                    issuer_id,
                    payment_method_id,
                    transaction_amount: Number(amount),
                    installments: Number(installments),
                    description: "Descrição do produto",
                    payer: {
                        email,
                        identification: {
                            type: identificationType,
                            number: identificationNumber,
                        },
                    },
                }),
            });
        },
        onFetching: (resource) => {
            console.log("Fetching resource: ", resource);

            // Animate progress bar
            const progressBar = document.querySelector(".progress-bar");
            progressBar.removeAttribute("value");

            return () => {
                progressBar.setAttribute("value", "0");
            };
        }
    },
});

/*
Ao enviar o formulário, um token é gerado representando, de forma segura, os dados do cartão.
É possível acessá-lo através da função getCardFormData, como mostrado anteriormente no callback onSubmit.
Além disso, este token também é armazenado em um input oculto dentro do formulário no qual poderá ser encontrado com a nomenclatura MPHiddenInputToken.

e por aqui finalizamos o front end, visto que já implementamos o formulário e seu funcionamento de criação do token..


Para continuar o processo de integração de pagamento via cartão, 
é necessário que o backend receba a informação do formulário com o token gerado e os dados completos conforme indicado nas etapas anteriores.
 
No exemplo da seção anterior,
enviamos todos os dados necessários para criar o pagamento para o endpoint process_payment do backend.
 

Com todas as informações coletadas no backend, envie um POST com os atributos necessários,
atentando-se aos parâmetros token, transaction_amount, installments, payment_method_id e o payer.email ao endpoint /v1/payments e execute a requisição ou, se preferir, faça o envio das informações utilizando nossos SDKs.
*/