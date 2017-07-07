<?php

require_once './ValidateCode.php';  //先把类包含进来，实际路径根据实际情况进行修改。
$_vc = new ValidateCode();  //实例化一个对象
setcookie($_SERVER["REMOTE_ADDR"]."re_code",$_vc->getCode(),time()+60,"/"); 
$_vc->doimg(); 
//var_dump($_COOKIE['register_code']);
?>