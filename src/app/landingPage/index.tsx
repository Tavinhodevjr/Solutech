import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import * as MailComposer from 'expo-mail-composer';
import { styles } from './styles';
import { useRouter } from 'expo-router';

export default function LandingPage() {
  const router = useRouter();

  // Campos do formulário de contato
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // Estado do alert customizado
  const [alertModal, setAlertModal] = useState<{
    visible: boolean;
    title: string;
    message: string;
    onConfirm?: () => void;
  }>({ visible: false, title: '', message: '' });

  // Exibe alert customizado
  const showAlert = (
    title: string,
    message: string,
    onConfirm?: () => void
  ) => {
    setAlertModal({ visible: true, title, message, onConfirm });
  };
  const closeAlert = () => {
    setAlertModal({ visible: false, title: '', message: '', onConfirm: undefined });
  };

  /**
   * Abre o app de e-mail com um rascunho pronto para o usuário enviar.
   */
  const handleSendContact = async () => {
    // 1. Validações dos campos
    if (!name.trim() || !email.trim() || !message.trim()) {
      showAlert('Erro', 'Por favor, preencha nome, e-mail e mensagem.');
      return;
    }

    // 2. Monta o corpo do e-mail
    const body =
      `Olá ${name},\n\n` +
      `Recebemos sua mensagem e entraremos em contato em breve!\n\n` +
      `Você nos escreveu:\n${message}\n\n` +
      `— Equipe Solutech`;

    // 3. Composição do e-mail
    try {
      const result = await MailComposer.composeAsync({
        recipients: ['solutech@gmail.com'], // destinatário padrão
        subject: 'Contato Solutech ✔️',
        body,
      });
      if (result.status === 'sent' || result.status === 'saved') {
        showAlert('Sucesso', 'Seu e-mail foi preparado no app de mensagens.', () => {
          setName('');
          setEmail('');
          setMessage('');
        });
      }
    } catch (err) {
      console.error(err);
      showAlert('Erro', 'Não foi possível abrir o app de e-mail.');
    }
  };

  return (
    <>
      <ScrollView style={styles.container}>
        {/* ========================= Navbar ========================= */}
        <View style={styles.navbar}>
          <View style={styles.navContainer}>
            <Image
              source={require('../../assets/images/logoBranca.png')}
              style={styles.logo}
            />
            <View style={styles.navLinks}>
              <TouchableOpacity onPress={() => router.push('/registerPage')}>
                <Text style={styles.navLinkText}>CADASTRE-SE</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => router.push('/login')}>
                <Text style={styles.navLinkText}>LOGIN</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* ========================= About Section ========================= */}
        <View style={styles.aboutSection}>
          <Text style={styles.welcomeText}>SEJA BEM-VINDO A SOLUTECH!</Text>
          <View style={styles.blueContainer}>
            <View style={styles.blueContent}>
              <Text style={styles.transformText}>VALORES</Text>
              <Text style={styles.readyText}>
                Estamos prontos para transformar desafios em oportunidades e ajudar empresas a adotarem práticas responsáveis e sustentáveis. Junte-se a nós na construção de um futuro melhor
              </Text>
              <Image
                source={require('../../assets/images/transformarCuidar.png')}
                style={styles.wasteImage}
              />
              <Text style={styles.transformText}>SOBRE NÓS</Text>
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
        <View style={styles.contactSection}>
          <Text style={styles.contactHeader}>Contato</Text>
          <Text style={styles.contactDescription}>
            Entre em contato conosco para mais informações sobre nossos serviços e soluções ambientais.
          </Text>
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Seu nome"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={styles.input}
              placeholder="Seu e-mail"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Envie aqui a sua dúvida!"
              multiline
              numberOfLines={4}
              value={message}
              onChangeText={setMessage}
            />
            <TouchableOpacity style={styles.button} onPress={handleSendContact}>
              <Text style={styles.buttonText}>Enviar</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ========================= Footer Section ========================= */}
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
                    &copy; 2025 Solutech - Todos os direitos reservados
                  </Text>
                </View>
              </View>
      </ScrollView>

      {/* Alert Customizado */}
      <Modal
        visible={alertModal.visible}
        transparent
        animationType="fade"
        onRequestClose={closeAlert}
      >
        <TouchableWithoutFeedback onPress={closeAlert}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
        <View style={styles.alertModal}>
          <Text style={styles.alertTitle}>{alertModal.title}</Text>
          <Text style={styles.alertMessage}>{alertModal.message}</Text>
          <TouchableOpacity
            style={styles.alertButton}
            onPress={() => {
              closeAlert();
              alertModal.onConfirm?.();
            }}
          >
            <Text style={styles.alertButtonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
}
