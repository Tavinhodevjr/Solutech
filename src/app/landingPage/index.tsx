import React from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { styles } from './styles';

// Componente funcional representando a Landing Page
export default function LandingPage() {
  return (
    // ScrollView para permitir a rolagem caso o conteúdo ultrapasse a altura da tela
    <ScrollView style={styles.container}>
      
      {/* ========================= Navbar ========================= */}
      {/* Equivalente à tag <nav> do HTML. Contém o logo e os links de navegação */}
      <View style={styles.navbar}>
        <View style={styles.navContainer}>
          {/* Logo do projeto */}
          <Image
            source={require('../../assets/images/logoBranca.png')}
            style={styles.logo}
          />
          {/* Lista de links de navegação */}
          <View style={styles.navLinks}>
             <TouchableOpacity>
              <Text style={styles.navLinkText}>CONECTAR</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.navLinkText}>LOGIN</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      
      {/* ========================= About Section ========================= */}
      {/* Bloco “SOBE NÓS” que apresenta a mensagem de boas-vindas e informações sobre a empresa */}
      <View style={styles.aboutSection}>
        <Text style={styles.welcomeText}>
          SEJA BEM-VINDO A SOLUTECH!
        </Text>

        {/* Container com fundo azul (simulado com a cor secundária da paleta) */}
        <View style={styles.blueContainer}>
          <View style={styles.blueContent}>
            {/* Imagem do logo (apenas um exemplo, usa a imagem coringa) */}
            <Text style={styles.transformText}>VALORES</Text>
            {/* Texto que convida para transformação */}
            <Text style={styles.readyText}>
            Estamos prontos para transformar desafios em oportunidades e ajudar empresas a adotarem práticas responsáveis e sustentáveis. Junte-se a nós na construção de um futuro melhor
            </Text>
            {/* Imagem de lixos variados – aqui usando a coringa */}
            <Image
              source={require('../../assets/images/transformarCuidar.png')}
              style={styles.wasteImage}
            />
            {/* Texto com destaque “TRANSFORMAR PARA CUIDAR” */}
            <Text style={styles.transformText}>SOBRE NÓS</Text>
            {/* Cabeçalho “SOBRE NÓS” */}
            {/* Descrição detalhada sobre a empresa */}
            <Text style={styles.aboutDescription}>
              Somos uma empresa especializada em soluções de gerenciamento de resíduos,
              comprometida com a sustentabilidade e a responsabilidade ambiental. Nosso
              objetivo é conectar empresas que precisam descartar materiais, como metais e
              outros resíduos, a aquelas que podem reaproveitá-los, criando um ciclo de economia
              circular que beneficia tanto o meio ambiente quanto a sociedade.
              {"\n\n"}
              Nosso compromisso vai além da sustentabilidade: valorizamos o desenvolvimento
              contínuo, a inovação e os recursos humanos, garantindo alta produtividade e
              satisfação plena de nossos clientes e fornecedores. Além disso, possuímos todas as
              licenças ambientais exigidas pelos órgãos reguladores, proporcionando segurança e
              tranquilidade aos nossos parceiros.
            </Text>
          </View>
        </View>
      </View>
      
      {/* ========================= Services Section ========================= */}
      {/* Seção que apresenta os serviços principais em “cards” */}
      <View style={styles.servicesSection}>
        <Text style={styles.servicesHeader}>O QUE PROMOVEMOS?</Text>
        
        {/* ----- Card 1: Economia Circular ----- */}
        <View style={styles.card}>
          <Image
            source={require('../../assets/images/economiaCircular.png')}
            style={styles.cardImage}
          />
          <Text style={styles.cardNumber}>01</Text>
          <Text style={styles.cardTitle}>ECONOMIA CIRCULAR</Text>
          <Text style={styles.cardDescription}>
            A economia circular promove a reutilização de recursos, reduzindo desperdício.
            Para empresas, diminui custos, facilita a conformidade ambiental, melhora a imagem e
            gera inovação sustentável.
          </Text>
        </View>
        
        {/* ----- Card 2: Transporte e Coleta ----- */}
        <View style={styles.card}>
          <Image
            source={require('../../assets/images/caminhao.png')}
            style={styles.cardImage}
          />
          <Text style={styles.cardNumber}>02</Text>
          <Text style={styles.cardTitle}>TRANSPORTE E COLETA</Text>
          <Text style={styles.cardDescription}>
            O transporte e a coleta adequados garantem a segurança e conformidade ambiental no
            manejo de resíduos. Usamos veículos especializados e logística eficiente, assegurando o
            descarte correto e sustentável, com confiança e segurança para os clientes.
          </Text>
        </View>
        
        {/* ----- Card 3: Conectar Parceiros ----- */}
        <View style={styles.card}>
          <Image
            source={require('../../assets/images/parceiros.png')}
            style={styles.cardImage}
          />
          <Text style={styles.cardNumber}>03</Text>
          <Text style={styles.cardTitle}>CONECTAR PARCEIROS</Text>
          <Text style={styles.cardDescription}>
            Conectar parceiros cria uma rede colaborativa que impulsiona a reutilização de recursos
            e a economia circular. Facilitamos o fluxo de materiais, transformando resíduos em
            insumos valiosos. Para os parceiros, isso reduz custos, minimiza impactos ambientais,
            garante conformidade com normas e abre novas oportunidades de negócios.
          </Text>
        </View>
        
        {/* ----- Card 4: Gestão de Resíduos ----- */}
        <View style={styles.card}>
          <Image
            source={require('../../assets/images/gestaoResiduos.png')}
            style={styles.cardImage}
          />
          <Text style={styles.cardNumber}>04</Text>
          <Text style={styles.cardTitle}>GESTÃO DE RESÍDUOS</Text>
          <Text style={styles.cardDescription}>
            A gestão de resíduos empresariais envolve a coleta, tratamento e descarte adequados dos
            resíduos, garantindo conformidade com as leis ambientais e práticas como reciclagem e
            reutilização. É importante para as empresas por ajudar a cumprir a legislação, melhorar
            a imagem sustentável, reduzir custos operacionais e minimizar impactos ambientais.
          </Text>
        </View>
      </View>
      
      {/* ========================= Contact Section ========================= */}
      {/* Seção de contato com um formulário simples */}
      <View style={styles.contactSection}>
        <Text style={styles.contactHeader}>Contato</Text>
        <Text style={styles.contactDescription}>
          Entre em contato conosco para mais informações sobre nossos serviços e soluções
          ambientais.
        </Text>
        <View style={styles.form}>
          <TextInput style={styles.input} placeholder="Seu nome" />
          <TextInput
            style={styles.input}
            placeholder="Seu email"
            keyboardType="email-address"
          />
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Sua mensagem"
            multiline
            numberOfLines={4}
          />
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Enviar</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      {/* ========================= Footer Section ========================= */}
      {/* Rodapé com logo, links de navegação e contato */}
      <View style={styles.footer}>
        <View style={styles.footerContainer}>
          <Image
            source={require('../../assets/images/logoTransparenteBranca.png')}
            style={styles.footerLogo}
          />
          {/* Coluna com links */}
          <View style={styles.footerColumn}>
            <Text style={styles.footerTitle}>Links</Text>
            <Text style={styles.footerLink}>Sobre Nós</Text>
            <Text style={styles.footerLink}>Serviços</Text>
            <Text style={styles.footerLink}>Contatos</Text>
            <Text style={styles.footerLink}>Login</Text>
          </View>
          {/* Coluna com informações de contato */}
          <View style={styles.footerColumn}>
            <Text style={styles.footerTitle}>Contato</Text>
            <Text style={styles.footerLink}>Envie um e-mail para</Text>
            <Text style={styles.footerLink}>solutech@gmail.com</Text>
          </View>
        </View>
        <View style={styles.footerBottom}>
          <Text style={styles.footerCopyright}>
            &copy; 2025 Solutech © Todos os direitos reservados.
          </Text>
        </View>
      </View>
      
    </ScrollView>
  );
}
