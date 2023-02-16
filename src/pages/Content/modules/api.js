import axios from "axios";

export const createProspectFromArray = (profiles) => {
  chrome.storage.sync.get(["token"], async function ({ token }) {
    try {
      const res = await axios.post(
        "http://localhost:4000/api/create-prospect",
        {
          profiles,
          tokenHeader: `Bearer ${token.access_token}`,
        }
      );
      console.log(res.data);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  });
};

export const fetchToken = () => {
  chrome.storage.sync.get(["token"], async function ({ token }) {
    const linkRegex = RegExp("(?<=code=).*$");
    const code = linkRegex.exec(window.location.search)?.at(0);
    try {
      if (token) return;

      if (!code) {
        const client_id = "plgTJ1AIqNjv0IockolxdjhWx70vil~Gd1aTql9S49L_";
        const redirect_uri = "https://www.linkedin.com/search/";
        const url = `https://api.outreach.io/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code&scope=prospects.write`;

        return window.location.replace(url);
      } else {
        const { data } = await axios.post(
          "http://localhost:4000/api/get-token",
          {
            code,
          }
        );
        console.log(data);
        chrome.storage.sync.set({ token: data.data }).then(() => {
          console.log("Value is set to " + token);
        });
      }
    } catch (err) {
      console.log(err);
    }
  });
};
