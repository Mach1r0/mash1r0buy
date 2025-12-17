import React from 'react'
import './footer.css'

export default function Footer() {
  return (
    <div className={'container-all'}>
      <div className={'container-footer'}>
        <div className='container-infos'>
          <h4>Institucional</h4>
          <p> Sobre </p>
          <p> Contato </p>
          <p> Termos </p>
        </div>

        <div className='container-sac'>
          <h4>SAC</h4>
          <p> Fale conosco </p>
          <p> Contato </p>
          <p> (61) 99999-9999</p>
          <p> email </p>
          <p> exemplo@gmail.com</p>
        </div>

        <div className='container-infos'>
          <h4>Termos</h4>
          <p> Termos de Uso </p>
          <p> Política de Privacidade</p>
        </div>

        <hr style={{ width: '100%', border: 'none', borderTop: '1px solid #e0e0e0', margin: '24px 0 12px 0' }} />

        <p>
          Fotos ilustrativas. Compras podem ser canceladas em caso de suspeita de fraude. 
          O valor total de sua compra poderá ser alterado para mais ou para menos por conta dos produtos de peso variável. 
          Preços, ofertas e condições exclusivos para internet e válidos durante o dia de hoje, 
          podendo sofrer alterações sem prévia notificação. Em caso de divergência de valores no site, 
          o valor válido é o do carrinho de compras. Venda sujeita à disponibilidade de estoque no dia da entrega.
          No caso de faltar algum produto, este não será entregue e o valor correspondente não será cobrado.
          Proibida a venda de bebidas alcoólicas para menores de 18 anos. Beba com moderação.
        </p>
      </div>
      <hr style={{ width: '100%', border: 'none', borderTop: '1px solid #e0e0e0', margin: '0' }} />
      <div>
        <p>
          Desenvolvido por <a href="https://github.com/Mach1r0" target="_blank" rel="noopener noreferrer">Mashiro</a> &copy; 2024
        </p>
      </div>
    </div>
  )
}
