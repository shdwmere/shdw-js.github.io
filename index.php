<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Front-end MercadoPago</title>
    <style>
        /*Estilização do formulário de pagamento*/
        #form-checkout {
            display: flex;
            flex-direction: column;
            max-width: 600px;
        }

        .container {
            height: 18px;
            display: inline-block;
            border: 1px solid rgb(118, 118, 118);
            border-radius: 2px;
            padding: 1px 2px;
        }

        /*Estilização do formulário de pagamento*/
    </style>
</head>

<body>
    <!--Formulário de pagamento-->
    <form action="process_payment.php" method="POST" id="form-checkout">
        <div id="form-checkout__cardNumber" class="container"></div>
        <div id="form-checkout__expirationDate" class="container"></div>
        <div id="form-checkout__securityCode" class="container"></div>
        <input type="text" id="form-checkout__cardholderName" />
        <select id="form-checkout__issuer"></select>
        <select id="form-checkout__installments"></select>
        <select id="form-checkout__identificationType"></select>
        <input type="text" id="form-checkout__identificationNumber" />
        <input type="email" id="form-checkout__cardholderEmail" />

        <button type="submit" id="form-checkout__submit">Pagar</button>
        <progress value="0" class="progress-bar">Carregando...</progress>
    </form>
    <!--Formulário de pagamento-->



    <!--SDK Mercadopago.js-->
    <script src="https://sdk.mercadopago.com/js/v2"></script>

    <!--Scripts-->
    <script src="index.js"></script>
    <!--Scripts-->

</body>

</html>