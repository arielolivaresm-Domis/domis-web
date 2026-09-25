import { ChevronDown } from 'lucide-react';
import MarcaDomis from './MarcaDomis';
import { EMPRESA, HONORARIOS, SUBSIDIO_TOPE_UF, conIva } from './config';
import { clp } from './hipoteca';

// Textos legales de la sección privada. Base: análisis cruzado Perplexity + Claude
// (25-sep-2026). Borrador de trabajo: debe revisarlo un abogado de derecho del
// consumidor antes de publicar.
// Normas: Ley 19.496 (arts. 16, 28, 30, 33), Ley 21.521 (Fintec), Ley 19.628 y
// Ley 21.719 (datos personales, vigente desde 01-12-2026).

const pctIva = (p: number) => conIva(p).toLocaleString('es-CL', { maximumFractionDigits: 2 });

export default function AvisosLegales() {
  const e = EMPRESA;
  return (
    <footer className="px-4 sm:px-6 pb-16">
      <div className="max-w-5xl mx-auto border-t border-slate-800 pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <MarcaDomis />
        <p className="text-xs text-slate-500">© {new Date().getFullYear()} DOMIS™ Auditoría Inmobiliaria.</p>
      </div>

      {/* Aviso corto */}
      <p className="max-w-5xl mx-auto mt-6 text-xs text-slate-400 leading-relaxed">
        {e.marca} es una marca de {e.razonSocial}, RUT {e.rut}, domicilio {e.domicilio}. {e.marca} no es banco, institución financiera,
        corredora de seguros ni asesor crediticio o de inversiones registrado ante la CMF. Los simuladores, tasas y comparaciones de esta
        sección son referenciales: no son una oferta de crédito ni una asesoría financiera, y cada institución confirma sus condiciones al
        evaluar tu solicitud.
      </p>

      <div className="max-w-5xl mx-auto mt-6 divide-y divide-slate-800 border-y border-slate-800">
        <Desplegable titulo="Aviso legal">
          <h4>1. Quiénes somos</h4>
          <p>Esta sección pertenece a {e.razonSocial}, RUT {e.rut}, con domicilio en {e.domicilio}, que opera bajo la marca {e.marca}. Contacto: {e.correo} · WhatsApp {e.whatsapp}.</p>
          <h4>2. Qué hace {e.marca}</h4>
          <p>{e.marca} presta servicios de auditoría técnica de propiedades y de negociación de precio para compradores. {e.marca} no es banco ni institución financiera, no otorga créditos, no es corredora de seguros y no presta servicios de asesoría crediticia ni de asesoría de inversión regulados por la Ley N° 21.521. {e.marca} no evalúa la capacidad de pago de las personas ni recomienda contratar un crédito con una institución determinada.</p>
          <h4>3. Información referencial</h4>
          <p>Los simuladores, comparadores, tablas de tasas y cifras de esta sección son estimaciones generales hechas con los supuestos que se indican en cada herramienta. No son una cotización, una oferta ni una promesa de resultado. Las condiciones reales de un crédito (tasa, CAE, seguros, gastos, plazo y aprobación) las fija cada institución financiera después de evaluar tu caso. Antes de decidir, pide a la institución la cotización formal y la Carga Anual Equivalente (CAE).</p>
          <h4>4. Información de terceros</h4>
          <p>Las tasas bancarias, el valor de la UF y la información sobre subsidios y garantías estatales provienen de fuentes públicas que se indican junto a cada dato, con su fecha de consulta. Esa información puede cambiar sin aviso. {e.marca} la revisa periódicamente, pero la fuente oficial siempre prevalece: la institución financiera respectiva, el MINVU, el Ministerio de Hacienda o el Banco Central.</p>
          <h4>5. Subsidios y beneficios estatales</h4>
          <p>La información sobre el subsidio a la tasa de interés hipotecaria (Ley N° 21.748, modificada por la Ley N° 21.836) y la garantía FOGAES es un resumen: aplica a viviendas nuevas, en primera venta, de hasta UF {SUBSIDIO_TOPE_UF.toLocaleString('es-CL')}. Los requisitos, cupos y plazos los determinan la ley, sus reglamentos y las instituciones participantes. Que una vivienda o una persona parezca elegible en esta sección no garantiza que obtenga el beneficio.</p>
          <h4>6. Precios de {e.marca}</h4>
          <p>Los precios de los servicios de {e.marca} se indican con IVA incluido: auditoría {clp(conIva(HONORARIOS.auditoriaUsadaM2))}/m² (mínimo {clp(conIva(HONORARIOS.auditoriaMinimoNeto))}); comisión de éxito {pctIva(HONORARIOS.comisionVivirPct)}% del ahorro negociado ({pctIva(HONORARIOS.comisionInversionPct)}% para inversionistas), con un mínimo de {clp(conIva(HONORARIOS.anticipoMinimo))}. Se entiende por ahorro negociado la diferencia entre el precio publicado de la propiedad y el precio logrado en la compra. Las condiciones completas constan en la propuesta y el contrato que se firman antes de iniciar el trabajo.</p>
          <h4>7. Marcas</h4>
          <p>Los nombres de bancos e instituciones mencionados pertenecen a sus respectivos titulares y se usan solo para identificar la fuente de la información publicada. Su mención no implica patrocinio, alianza ni relación comercial con {e.marca}, que no recibe pagos de ellas.</p>
          <h4>8. Responsabilidad</h4>
          <p>{e.razonSocial} responde por los servicios que contrates conforme a la ley y a tu contrato. Las herramientas de esta sección son de uso gratuito y referencial; te recomendamos no tomar decisiones de endeudamiento ni de compra basadas solo en ellas.</p>
          <h4>9. Actualización</h4>
          <p>Este aviso fue actualizado el {e.avisoActualizado}. Se rige por las leyes de la República de Chile.</p>
        </Desplegable>

        <Desplegable titulo="Términos de uso de la sección privada">
          <ol>
            <li><strong>Acceso:</strong> la clave se entrega a personas interesadas en los servicios de {e.marca} para uso personal. Por favor no la compartas. Ingresar con la clave implica aceptar estos términos.</li>
            <li><strong>Contenido:</strong> la información de esta sección es general y referencial (ver Aviso legal). No constituye oferta de crédito ni asesoría financiera, crediticia, de inversión, legal o tributaria.</li>
            <li><strong>Vigencia:</strong> los datos de tasas, UF y subsidios tienen la fecha de consulta indicada en cada uno. Verifica su vigencia en la fuente oficial antes de decidir.</li>
            <li><strong>Contratación:</strong> usar las herramientas no implica contratar a {e.marca}. El servicio se contrata solo mediante propuesta y contrato firmados, donde constan el precio final con IVA y las condiciones.</li>
            <li><strong>Propiedad:</strong> los textos, simuladores y metodologías son de {e.razonSocial}. Las marcas de terceros pertenecen a sus titulares.</li>
            <li><strong>Datos:</strong> las herramientas no solicitan datos personales. Si nos escribes por WhatsApp, se aplica el Aviso de privacidad.</li>
          </ol>
        </Desplegable>

        <Desplegable titulo="Aviso de privacidad">
          <p><strong>Responsable:</strong> {e.razonSocial} ({e.marca}), RUT {e.rut}, {e.domicilio}, {e.correo}.</p>
          <ul>
            <li>Las herramientas de esta sección no piden ni guardan datos personales. Solo se recuerda en tu navegador, durante la sesión, que ingresaste la clave.</li>
            <li>El sitio usa Google Analytics, Meta Pixel y Microsoft Clarity para medir visitas y mejorar la experiencia. Estos servicios de terceros pueden usar cookies y tratan datos de navegación según sus propias políticas.</li>
            <li>Si nos contactas por WhatsApp, recibiremos tu número, tu nombre de perfil y lo que nos escribas. Usamos esos datos solo para responder tu consulta y, si nos contratas, para prestar el servicio. No los vendemos ni los cedemos a terceros con fines comerciales.</li>
            <li>WhatsApp es un servicio de Meta Platforms, que trata tus datos según sus propias políticas.</li>
            <li>Conservamos las conversaciones por {e.conservacionDatos}, salvo obligación legal de conservarlas por más tiempo.</li>
            <li>Puedes pedir acceso, rectificación, supresión u oposición al tratamiento de tus datos escribiendo a {e.correo}. Responderemos dentro de los plazos legales.</li>
            <li>Actualizado el {e.avisoActualizado}.</li>
          </ul>
        </Desplegable>
      </div>
    </footer>
  );
}

function Desplegable({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <details className="group">
      <summary className="flex items-center justify-between cursor-pointer list-none py-4 text-sm font-semibold text-slate-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded [&::-webkit-details-marker]:hidden">
        {titulo}
        <ChevronDown size={16} className="text-cyan-400 transition-transform group-open:rotate-180" aria-hidden="true" />
      </summary>
      <div className="pb-6 text-xs text-slate-400 leading-relaxed space-y-2 [&_h4]:text-slate-200 [&_h4]:font-semibold [&_h4]:mt-4 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_strong]:text-slate-200">
        {children}
      </div>
    </details>
  );
}
