<?php
// Encontre o estado do programa no campo status.

require_once 'vendor/autoload.php';

MercadoPago\SDK::setAccessToken("APP_USR-1869536208867128-020714-0a30a437828ac67352c0656038a0af13-1162132629");

// Instancia a classe Payment que provê os metodos para acessar a API que irá criar o pagamento. 
$payment = new MercadoPago\Payment();
$payment->transaction_amount = (float) $_POST['transactionAmount'];
$payment->token = $_POST['token'];
$payment->description = $_POST['description'];
$payment->installments = (int) $_POST['installments'];
$payment->payment_method_id = $_POST['paymentMethodId'];
$payment->issuer_id = (int) $_POST['issuer'];

// Criando novo pagador atribuindo os dados preenchidos no form
$payer = new MercadoPago\Payer();
$payer->email = $_POST['email'];
$payer->identification = array(
    "type" => $_POST['identificationType'],
    "number" => $_POST['identificationNumber']
);

// pagador recebe a transação
$payment->payer = $payer;

// salva o pagamento
$payment->save();

//resposta do pagamento
$response = array(
    'status' => $payment->status,
    'status_detail' => $payment->status_detail,
    'id' => $payment->id
);
echo json_encode($response);

?>