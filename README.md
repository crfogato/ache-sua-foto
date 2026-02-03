📸 Ache Sua Foto
O Ache Sua Foto é uma solução inteligente para fotógrafos de eventos que desejam automatizar a entrega de fotos. Através de um sistema de códigos únicos, os clientes podem localizar e baixar suas fotos de forma rápida, segura e organizada.

🚀 Funcionalidades
Busca por Código: O cliente insere um código exclusivo e acessa sua galeria privada.

Validação de Uso Único: Sistema de segurança que registra quando um código foi utilizado, evitando compartilhamentos indevidos.

Otimização de Imagens: Interface rápida e responsiva para visualização de fotos.

Integração com Firebase: Autenticação e banco de dados em tempo real para máxima performance.

🛠️ Tecnologias Utilizadas
React.js + Vite

Firebase (Auth, Realtime Database & Storage)

Tailwind CSS (ou a biblioteca de estilos que você usou)

Lucide React (Ícones)

📦 Como rodar o projeto

1. Clonar o repositório
   Bash
   git clone https://github.com/seu-usuario/ache-sua-foto.git
   cd ache-sua-foto
2. Instalar as dependências
   Bash
   npm install

# ou

yarn install 3. Configurar as Variáveis de Ambiente
Crie um arquivo .env na raiz do projeto e preencha com suas credenciais do Firebase (use o arquivo .env.example como base):

Snippet de código
VITE_FIREBASE_API_KEY=seu_valor
VITE_FIREBASE_AUTH_DOMAIN=seu_valor
VITE_FIREBASE_PROJECT_ID=seu_valor
VITE_FIREBASE_STORAGE_BUCKET=seu_valor
VITE_FIREBASE_MESSAGING_SENDER_ID=seu_valor
VITE_FIREBASE_APP_ID=seu_valor
VITE_FIREBASE_DATABASE_URL=seu_valor 4. Iniciar o servidor de desenvolvimento
Bash
npm run dev
🔒 Regras de Segurança (Firebase)
O projeto utiliza regras rígidas no Firebase Realtime Database para garantir que:

Usuários só leiam códigos específicos se souberem o caminho exato.

Códigos não possam ser sobrescritos após o primeiro uso (.validate: "!data.exists()").

👤 Autor - crfogato
Seu LinkedIn - https://www.linkedin.com/in/crfogato
Seu Portfólio - https://github.com/crfogato/ache-sua-foto
