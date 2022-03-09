<?
include('./vendor/autoload.php');
include('./firebase.class.php');

$_firebase = new websocket([
							"type"							=> "",
							"project_id"					=> "",
							"private_key_id"				=> "",
							"private_key"					=> "",
							"client_email"					=> "",
							"client_id"						=> "",
							"auth_uri"						=> "",
							"token_uri"						=> "",
							"auth_provider_x509_cert_url"	=> "",
							"client_x509_cert_url"			=> "m"
						]);

						

$_firebase->base("php_teste");
$_firebase->push('aaaaaa',6666666);
// $_firebase->set('aaaaa', 555555);
// $_firebase->get('aaaaa');
// $_firebase->delete('aaaaa');