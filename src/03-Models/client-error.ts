class ClientError { // 4xx 400,401,402,403,404...

      public status: number;
      public message: string;

      public constructor(status: number, message: string) {
            this.status = status;
            this.message = message;
      }

}

export default ClientError;