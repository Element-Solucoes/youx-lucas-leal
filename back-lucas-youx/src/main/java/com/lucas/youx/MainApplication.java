package com.lucas.youx;

import java.io.FileInputStream;
import java.io.IOException;
import java.nio.file.Path;
import java.util.Map;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.auth.FirebaseAuthException;
import com.lucas.youx.classes.AuthorizationChecker;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class MainApplication {

  // Usado para rodar queries de SQL.
  @Autowired
  private JdbcTemplate jdbcTemplate;

  // Guarda uma instância do firebase.
  private static FirebaseApp firebase;

  public static void main(String[] args) throws IOException {
    SpringApplication.run(MainApplication.class, args);

    // Carrega o arquivo de configuração do firebase.
    Path path = Path.of("src/main/java/com/lucas/youx/firebase_key.json");

    // Inicia o aplicativo do firebase.
    FileInputStream serviceAccount = new FileInputStream(path.toFile());
    FirebaseOptions options = new FirebaseOptions.Builder().setCredentials(GoogleCredentials.fromStream(serviceAccount)).build();
    firebase = FirebaseApp.initializeApp(options);
  }

  // Rota para adição de pacientes.
  @PostMapping("/addPatient") 
  public ResponseEntity<String> Parse_AddPatient( @RequestBody Map<String,Object> body, @RequestHeader("Authorization") String auth) {
    // Autentica o token da rota.
    if (!AuthorizationChecker.CheckAuth(auth)) { return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Você não tem permissão para usar esta rota."); }
    return PatientRegister.ParsePatientRegistry(body, jdbcTemplate);
  }

  // Rota para adição de profissionais.
  @PostMapping("/addProfessional") 
  public ResponseEntity<String> Parse_AddProfessional( @RequestBody Map<String,Object> body, @RequestHeader("Authorization") String auth) throws FirebaseAuthException {
    // Autentica o token da rota.
    if (!AuthorizationChecker.CheckAuth(auth)) { return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Você não tem permissão para usar esta rota."); }
    return ProfessionalRegister.ParseProfessionalRegistry(body, jdbcTemplate, firebase);
  }

  // Rota para retornar uma lista de pacientes.
  @GetMapping("/getPatients")
  public ResponseEntity<String> Parse_GetPatients(@RequestHeader("Authorization") String auth) {
    // Autentica o token da rota.
    if (!AuthorizationChecker.CheckAuth(auth)) { return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Você não tem permissão para usar esta rota."); }
    return PatientRetriever.ParsePatientRecords(jdbcTemplate);
  }

  // Retorna o tipo de conta de um determinado usuário.
  @PostMapping("/getAccountType")
  public ResponseEntity<String> Parse_GetAccountType(@RequestBody Map<String,Object> body, @RequestHeader("Authorization") String auth) {
    // Autentica o token da rota.
    if (!AuthorizationChecker.CheckAuth(auth)) { return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Você não tem permissão para usar esta rota."); }
    return AccountTypeLoader.ParseAccountType(body, jdbcTemplate);
  }

  // Retorna uma lista de profissionais.
  @PostMapping("/getProfessionals")
  public ResponseEntity<String> Parse_GetProfessionals(@RequestBody Map<String,Object> body, @RequestHeader("Authorization") String auth) {
    // Autentica o token da rota.
    if (!AuthorizationChecker.CheckAuth(auth)) { return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Você não tem permissão para usar esta rota."); }
    return ProfessionalRetriever.ParseProfessionalRecords(body, jdbcTemplate);
  }
}