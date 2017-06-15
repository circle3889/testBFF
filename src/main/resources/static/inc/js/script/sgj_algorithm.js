/** 
 * @fileoverview SG Secukit Clinet 에서 사용할수 있는 알고리즘 목록
 *
 * @author hychul
 * @version 0.1
 * *
* <pre>
* 대칭키 암호화 알고리즘
* var DES_CBC_PKCS5 = "DES/CBC/PKCS5";
* var DESede_CBC_PKCS5 = "DESede/CBC/PKCS5";
* var ARIA_CBC_PKCS5 = "ARIA/CBC/PKCS5";
* var SEED_CBC_PKCS5 = "SEED/CBC/PKCS5";
* var RC5_CBC_PKCS5 = "RC5/CBC/PKCS5";
* var RC4_CBC_PKCS5 = "RC4/CBC/PKCS5";
* </pre>
*
* <pre>
* 공개키키 암호화 알고리즘
* var RSA = "RSA";
* var RSA_OAEPv2_1 = "RSA-OAEPv2_1";
* </pre>
*
* <pre>
* 해쉬 알고리즘
* var SHA1 = "SHA1";
* var SHA256 = "SHA-256";
* var SHA384 = "SHA-384";
* var SHA512 = "SHA-512";
* var MD5 = "MD5";
* var HAS160 = "HAS-160";
* </pre>
*
* <pre>
* 전자서명 알고리즘
* var MD5withRSA = "MD5withRSA";
* var SHA1withRSA = "SHA1withRSA";
* var SHA2withRSA = "SHA2withRSA";
* var HAS160withRSA = "HAS160withRSA";
* var HAS160withKCDSA = "HAS160withKCDSA";
* var SHA1withKCDSA = "SHA1withKCDSA";
* var RSASSAwithSHA1 = "SHA1withRSASSAv2_1-PSS";
* </pre>
*
* <pre>
* HMAC 알고리즘
* var HMACwithSHA1 = "HMACwithSHA1";
* var HMACwithSHA256 = "HMACwithSHA256";
* var HMACwithSHA384 = "HMACwithSHA384";
* var HMACwithSHA512 = "HMACwithSHA512";
* var HMACwithMD5 = "HMACwithMD5";
* var HMACwithHAS160 = "HMACwithHAS160";
* </pre>
*
* <pre>
* 의사 난수 생성 알고리즘
* var SHA1PRNG = "SHA1PRNG";
* </pre>
**/

var DES_CBC_PKCS5 = "DES/CBC/PKCS5";
var DESede_CBC_PKCS5 = "DESede/CBC/PKCS5";
var ARIA_CBC_PKCS5 = "ARIA/CBC/PKCS5";
var SEED_CBC_PKCS5 = "SEED/CBC/PKCS5";
var RC5_CBC_PKCS5 = "RC5/CBC/PKCS5";
var RC4_CBC_PKCS5 = "RC4/CBC/PKCS5";

/**
* <pre>
* 공개키키 암호화 알고리즘
* var RSA = "RSA";
* var RSA_OAEPv2_1 = "RSA-OAEPv2_1";
* </pre>
*/
var RSA = "RSA";
var RSA_OAEPv2_1 = "RSA-OAEPv2_1";

/**
* <pre>
* 해쉬 알고리즘
* var SHA1 = "SHA1";
* var SHA256 = "SHA-256";
* var SHA384 = "SHA-384";
* var SHA512 = "SHA-512";
* var MD5 = "MD5";
* var HAS160 = "HAS-160";
* </pre>
*/
var SHA1 = "SHA1";
var SHA256 = "SHA-256";
var SHA384 = "SHA-384";
var SHA512 = "SHA-512";
var MD5 = "MD5";
var HAS160 = "HAS-160";

/**
* <pre>
* 전자서명 알고리즘
* var MD5withRSA = "MD5withRSA";
* var SHA1withRSA = "SHA1withRSA";
* var SHA2withRSA = "SHA2withRSA";
* var HAS160withRSA = "HAS160withRSA";
* var HAS160withKCDSA = "HAS160withKCDSA";
* var SHA1withKCDSA = "SHA1withKCDSA";
* var RSASSAwithSHA1 = "SHA1withRSASSAv2_1-PSS";
* </pre>
*/
var MD5withRSA = "MD5withRSA";
var SHA1withRSA = "SHA1withRSA";
var SHA2withRSA = "SHA2withRSA";
var HAS160withRSA = "HAS160withRSA";
var HAS160withKCDSA = "HAS160withKCDSA";
var SHA1withKCDSA = "SHA1withKCDSA";
var RSASSAwithSHA1 = "SHA1withRSASSAv2_1-PSS";

/**
* <pre>
* HMAC 알고리즘
* var HMACwithSHA1 = "HMACwithSHA1";
* var HMACwithSHA256 = "HMACwithSHA256";
* var HMACwithSHA384 = "HMACwithSHA384";
* var HMACwithSHA512 = "HMACwithSHA512";
* var HMACwithMD5 = "HMACwithMD5";
* var HMACwithHAS160 = "HMACwithHAS160";
* </pre>
*/
var HMACwithSHA1 = "HMACwithSHA1";
var HMACwithSHA256 = "HMACwithSHA256";
var HMACwithSHA384 = "HMACwithSHA384";
var HMACwithSHA512 = "HMACwithSHA512";
var HMACwithMD5 = "HMACwithMD5";
var HMACwithHAS160 = "HMACwithHAS160";

/**
* <pre>
* 의사 난수 생성 알고리즘
* var SHA1PRNG = "SHA1PRNG";
* </pre>
*/
var SHA1PRNG = "SHA1PRNG";