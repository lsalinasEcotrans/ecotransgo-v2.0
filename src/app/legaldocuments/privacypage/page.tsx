"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PrivacyPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex items-center px-4 py-4 border-b border-border sticky top-0 bg-background z-10">
        <button
          onClick={() => router.back()}
          className="p-2 -ml-2 text-foreground hover:bg-secondary rounded-lg transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="flex-1 text-center text-lg font-semibold text-foreground pr-8">
          Politica de Privacidad
        </h1>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-6 overflow-auto">
        <div className="w-full max-w-2xl mx-auto prose prose-sm text-foreground">
          <p className="text-muted-foreground text-sm mb-4">
            Ultima actualizacion: Enero 2024
          </p>

          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-3">1. Introduccion</h2>
            <p className="text-muted-foreground leading-relaxed">
              En EcotransGO nos comprometemos a proteger su privacidad. Esta
              Politica de Privacidad explica como recopilamos, usamos,
              almacenamos y protegemos su informacion personal cuando utiliza
              nuestra aplicacion.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-3">
              2. Informacion que Recopilamos
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-2">
              Recopilamos los siguientes tipos de informacion:
            </p>
            <ul className="list-disc pl-5 text-muted-foreground space-y-1">
              <li>
                <strong>Datos de registro:</strong> nombre, correo electronico,
                numero de telefono
              </li>
              <li>
                <strong>Datos de ubicacion:</strong> ubicacion en tiempo real
                durante los servicios
              </li>
              <li>
                <strong>Datos de uso:</strong> historial de viajes,
                preferencias, calificaciones
              </li>
              <li>
                <strong>Datos del dispositivo:</strong> modelo, sistema
                operativo, identificadores unicos
              </li>
              <li>
                <strong>Datos de pago:</strong> metodo de pago (procesado por
                terceros seguros)
              </li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-3">
              3. Uso de la Informacion
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-2">
              Utilizamos su informacion para:
            </p>
            <ul className="list-disc pl-5 text-muted-foreground space-y-1">
              <li>Proporcionar y mejorar nuestros servicios de transporte</li>
              <li>Conectar usuarios con conductores disponibles</li>
              <li>Procesar pagos y transacciones</li>
              <li>Enviar notificaciones sobre sus servicios</li>
              <li>Garantizar la seguridad de usuarios y conductores</li>
              <li>Cumplir con obligaciones legales</li>
              <li>Analizar y mejorar la experiencia del usuario</li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-3">
              4. Compartir Informacion
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-2">
              Podemos compartir su informacion con:
            </p>
            <ul className="list-disc pl-5 text-muted-foreground space-y-1">
              <li>
                <strong>Conductores:</strong> nombre y ubicacion para realizar
                el servicio
              </li>
              <li>
                <strong>Proveedores de pago:</strong> para procesar
                transacciones
              </li>
              <li>
                <strong>Autoridades:</strong> cuando sea requerido por ley
              </li>
              <li>
                <strong>Socios comerciales:</strong> de forma anonimizada para
                analisis
              </li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-2">
              Nunca vendemos su informacion personal a terceros.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-3">
              5. Seguridad de Datos
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Implementamos medidas de seguridad tecnicas y organizativas para
              proteger su informacion, incluyendo encriptacion de datos, acceso
              restringido y monitoreo continuo. Sin embargo, ninguna transmision
              por Internet es completamente segura.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-3">
              6. Retencion de Datos
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Conservamos su informacion mientras su cuenta este activa o sea
              necesaria para proporcionarle servicios. Puede solicitar la
              eliminacion de su cuenta y datos en cualquier momento, sujeto a
              requisitos legales de retencion.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-3">7. Sus Derechos</h2>
            <p className="text-muted-foreground leading-relaxed mb-2">
              Usted tiene derecho a:
            </p>
            <ul className="list-disc pl-5 text-muted-foreground space-y-1">
              <li>Acceder a su informacion personal</li>
              <li>Rectificar datos incorrectos</li>
              <li>Solicitar la eliminacion de sus datos</li>
              <li>Oponerse al procesamiento de sus datos</li>
              <li>Solicitar la portabilidad de sus datos</li>
              <li>Retirar su consentimiento en cualquier momento</li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-3">
              8. Cookies y Tecnologias Similares
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Utilizamos cookies y tecnologias similares para mejorar su
              experiencia, recordar preferencias y analizar el uso de la
              aplicacion. Puede gestionar las preferencias de cookies desde la
              configuracion de su dispositivo.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-3">9. Menores de Edad</h2>
            <p className="text-muted-foreground leading-relaxed">
              Nuestros servicios estan dirigidos a personas mayores de 18 anos.
              No recopilamos intencionalmente informacion de menores. Si
              detectamos que hemos recopilado datos de un menor, los
              eliminaremos inmediatamente.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-3">
              10. Cambios a esta Politica
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Podemos actualizar esta politica periodicamente. Le notificaremos
              sobre cambios significativos a traves de la aplicacion o por
              correo electronico. Le recomendamos revisar esta politica
              regularmente.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-3">11. Contacto</h2>
            <p className="text-muted-foreground leading-relaxed">
              Si tiene preguntas sobre esta Politica de Privacidad o desea
              ejercer sus derechos, contactenos en:
              <br />
              <span className="text-primary">privacidad@ecotransgo.com</span>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
