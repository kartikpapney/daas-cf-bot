module.exports = {
  config:  {
    "type": "service_account",
    "project_id": "daas-cp-integration",
    "private_key_id": `${process.env.private_key_id}`,
    "private_key": `${process.env.private_key}`,
    "client_email": "daas-cp-integration@appspot.gserviceaccount.com",
    "client_id": `${process.env.client_id}`,
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/daas-cp-integration%40appspot.gserviceaccount.com"
  }
}