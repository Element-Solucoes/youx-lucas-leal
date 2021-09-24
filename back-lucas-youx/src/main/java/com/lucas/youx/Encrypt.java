package com.lucas.youx;

import java.security.Key;
import java.util.Base64;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;

// Função de encriptação disponível no link https://www.codegrepper.com/code-examples/java/frameworks/spring/java+spring+username+encode+and+decode

public class Encrypt {
  private static final String ALGO = "AES";
  private static final byte[] keyValue = new byte[] { 'Y', 'O', 'U', 'X', 'L', 'U', 'C', 'A', 'S', 'L', 'E', 'A', 'L', '-', '-', '-' };

  public static String encrypt(String pwd) {
      String encodedPwd = "";
      try {
          Key key = generateKey();
          Cipher c = Cipher.getInstance(ALGO);
          c.init(Cipher.ENCRYPT_MODE, key);
          byte[] encVal = c.doFinal(pwd.getBytes());
          encodedPwd = Base64.getEncoder().encodeToString(encVal);

      } catch (Exception e) {

          e.printStackTrace();
      }
      return encodedPwd;

  }

  public static String decrypt(String encryptedData) {
      String decodedPWD = "";
      try {
          Key key = generateKey();
          Cipher c = Cipher.getInstance(ALGO);
          c.init(Cipher.DECRYPT_MODE, key);
          byte[] decodedValue = Base64.getDecoder().decode(encryptedData);
          byte[] decValue = c.doFinal(decodedValue);
          decodedPWD = new String(decValue);

      } catch (Exception e) {

      }
      return decodedPWD;
  }

  private static Key generateKey() {
      SecretKeySpec key = new SecretKeySpec(keyValue, ALGO);
      return key;
  }
}
