<?php 

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
require 'PHPMailer-master\src\Exception.php';
require 'PHPMailer-master\src\PHPMailer.php';
require 'PHPMailer-master\src\SMTP.php';

$mail = new PHPMailer(TRUE);

//array associatif
$array = array("name"=>"","prenom"=>"","tel"=>"","email"=>"","sujet"=>"","message"=>"",
"nameError"=>"","prenomError"=>"","telError"=>"","emailError"=>"","sujetError"=>"","messageError"=>"",
"isSuccess" => false);

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $array["name"] = verifyInput($_POST["name"]);
    $array["prenom"] = verifyInput($_POST["prenom"]);
    $array["tel"]  = verifyInput($_POST["tel"]);
    $array["email"] = verifyInput($_POST["email"]);
    $array["sujet"]  = verifyInput($_POST["sujet"]);
    $array["message"]  = verifyInput($_POST["message"]);
    $array["isSuccess"] = true;
    //$emailText ="";

    $personn_array = array(ucwords($array["name"]),ucwords($array["prenom"]));
    $personn_comma = implode(",",$personn_array);
    $personn = str_replace(',', ' ', $personn_comma);
    
    $message_content = "<p>NOM - PRENOM :</p>".$personn."<br>"."<p>MESSAGE :</p>".$array["message"]."<p>TEL :</p>".$array["tel"]."</br>"."<p>EMAIL :</p>".$array["email"]; 

   

    if (empty($array["name"])) {
        $array["nameError"] = "Quel est votre nom?";
        $array["isSuccess"] = false;
    }

    elseif (empty($array["prenom"])) {
        $array["prenomError"] = "Quel est votre prenom?";
        $array["isSuccess"] = false;
    }
   
    
    elseif (!isPhone($array["tel"])) {
        $array["telError"] = "Insérez des chiffres et des espaces uniquement";
        $array["isSuccess"] = false;
    }
   

    elseif (!isEmail($array["email"])) {
        $array["emailError"]= "Entrez un email valide!";
        $array["isSuccess"] = false;
    }
    
    
    elseif (empty($array["sujet"])) {
        $array["sujetError"] = "Quel est le sujet de votre message?";
        $array["isSuccess"] = false;
    }
    
    elseif (empty($array["message"])) {
        $array["messageError"]= "Laissez-moi un message!";
        $array["isSuccess"]= false;
    }
    else {
        try{
            $mail->isSMTP();
            $mail->Host = 'smtp.gmail.com';
            $mail->SMTPAuth = TRUE;
            $mail->SMTPSecure = 'tls';
            $mail->Username = 'sandrabaptistacruz@gmail.com';//adresse marion
            $mail->Password = 'Helice1982';
            $mail->Port = 587;
            
           /* Set the mail sender. */
           $mail->setFrom($array["email"], $personn); //envoyeur
         
           /* Add a recipient. */
           $mail->addAddress("sandrabaptistacruz@gmail.com");//destinataire adresse marion
           $mail->addReplyTo($array["email"], $personn); // L'adresse de réponse
         
           $mail->isHTML(true);
           /* Set the subject. */
           $mail->Subject = $array["sujet"];
         
           /* Set the mail message body. */
           $mail->Body = $message_content;
           
         
           /* Finally send the mail. */
           $mail->send();

           //transformation array en objet Json avant envoi ajax
           echo json_encode($array);
        }
        catch(Exception $e) {
            $array["isSuccess"]= false;

            echo json_encode($array);
        }
    }
 
  

}

    //fonction validation numéro de tél ac expressions regulières
    function isPhone($var) {
        return preg_match("/^[0-9 ]+$/", $var);
    }

    //fonction validiter email
    function isEmail($var) {
    return filter_var($var, FILTER_VALIDATE_EMAIL);
   }

    //fonction sécurité form
    function verifyInput($var) {
    //enlève espaces,retour ligne
    $var = trim($var);
    //enlève antislash
    $var = stripslashes($var);
    // protection faille XSS
    $var = htmlspecialchars($var);
    return $var;
    }

?>
