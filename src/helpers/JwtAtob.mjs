export const JwtAtob = (token ) => {
    if (token.logged && token.logged !== false) {
        const decodePayload = JSON.parse(atob(token.split(".")[1]));
        return decodePayload;
      }
}