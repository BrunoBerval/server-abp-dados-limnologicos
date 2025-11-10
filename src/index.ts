import express, { Request, Response } from "express";
import dotenv from "dotenv";
import router from "./routes";
import { errorHandler } from "./middlewares/errorHandler";
import cors from "cors";
//import { corsOptions } from "./configs/corsConfig";

// Carrega .env somente local
if(process.env.NODE_ENV !== 'production'){
  dotenv.config();
  console.log("Variáveis de ambiente carregadas do .env");
}

// Inicializa a aplicação Express
const app = express();

// habilitar CORS em produção
//app.use(cors(corsOptions));
app.use(cors())

// Middleware para permitir o envio de dados em formato JSON no corpo das requisições
app.use(express.json());

// Middleware para permitir o envio de dados em formato URL-encoded no corpo das requisições
app.use(express.urlencoded({ extended: true }));

// Rotas principais
app.use("/api", router);

// Middleware para rotas não encontradas
app.use((_req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: "Rota não encontrada",
  });
});

// middleware de erro sempre por último
app.use(errorHandler);

// Exporta o app para a Vercel (isso transforma o Express em uma Serverless Function)
export default app;
