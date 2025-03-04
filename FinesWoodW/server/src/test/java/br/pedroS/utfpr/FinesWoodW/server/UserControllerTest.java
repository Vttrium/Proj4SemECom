package br.pedroS.utfpr.FinesWoodW.server;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ActiveProfiles;

import br.pedroS.utfpr.FinesWoodW.server.model.User;
import br.pedroS.utfpr.FinesWoodW.server.repository.UserRepository;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
public class UserControllerTest {

    @Autowired
    TestRestTemplate testRestTemplate;
    @Autowired
    UserRepository userRepository;

    @BeforeEach
    public void cleanup() {
        userRepository.deleteAll();
        testRestTemplate.getRestTemplate().getInterceptors().clear();
    }

    @Test
    public void postUser_whenUserIsValid_receiveOk() {
        User user = createValidUser();
        ResponseEntity<Object> response =
                testRestTemplate.postForEntity("/users", user, Object.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
    }

    @Test
    public void postUser_whenUserIsValid_userSavedToDatabase() {
        User user = createValidUser();

        testRestTemplate.postForEntity("/users", user, Object.class);

        assertThat( userRepository.count() ).isEqualTo( 1 );
    }

    private User createValidUser() {
        User user = new User();
        user.setName("test-user");
        user.setEmail("test-email");
        user.setPassword("P4ssword");

        return user;
    }
}
