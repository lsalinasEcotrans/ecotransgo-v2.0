"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function TermsPage() {
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
          Terminos y Condiciones
        </h1>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-6 overflow-auto">
        <div className="w-full max-w-2xl mx-auto prose prose-sm text-foreground">
          <p className="text-muted-foreground text-sm mb-4">
            Ultima actualizacion: Enero 2024
          </p>

          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-3">
              1. Aceptacion de los Terminos
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Al acceder y utilizar la aplicacion EcotransGO, usted acepta estar
              sujeto a estos Terminos y Condiciones de uso. Si no esta de
              acuerdo con alguna parte de estos terminos, no podra acceder al
              servicio.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-3">
              2. Descripcion del Servicio
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              EcotransGO es una plataforma tecnologica que conecta a usuarios
              que necesitan servicios de transporte con conductores
              independientes. La aplicacion permite solicitar, programar y pagar
              servicios de transporte de manera digital.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-3">
              3. Registro y Cuenta de Usuario
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-2">
              Para utilizar nuestros servicios, debe:
            </p>
            <ul className="list-disc pl-5 text-muted-foreground space-y-1">
              <li>Ser mayor de 18 anos</li>
              <li>Proporcionar informacion veraz y actualizada</li>
              <li>Mantener la confidencialidad de su contrasena</li>
              <li>Ser responsable de todas las actividades en su cuenta</li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-3">4. Uso del Servicio</h2>
            <p className="text-muted-foreground leading-relaxed mb-2">
              Al utilizar EcotransGO, usted se compromete a:
            </p>
            <ul className="list-disc pl-5 text-muted-foreground space-y-1">
              <li>No utilizar el servicio para fines ilegales</li>
              <li>Respetar a los conductores y demas usuarios</li>
              <li>Proporcionar direcciones precisas para el servicio</li>
              <li>
                Realizar el pago correspondiente por los servicios utilizados
              </li>
              <li>No compartir su cuenta con terceros</li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-3">5. Tarifas y Pagos</h2>
            <p className="text-muted-foreground leading-relaxed">
              Las tarifas se calculan en base a la distancia, tiempo estimado
              del viaje y tipo de vehiculo seleccionado. Los precios pueden
              variar segun la demanda. El usuario vera el precio estimado antes
              de confirmar el servicio. Los pagos se procesan de forma segura a
              traves de nuestra plataforma.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-3">6. Cancelaciones</h2>
            <p className="text-muted-foreground leading-relaxed">
              Los usuarios pueden cancelar un servicio sin cargo dentro de los
              primeros 5 minutos despues de la confirmacion. Cancelaciones
              posteriores pueden estar sujetas a cargos segun la politica
              vigente.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-3">
              7. Limitacion de Responsabilidad
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              EcotransGO actua como intermediario tecnologico entre usuarios y
              conductores. No somos responsables por danos, perdidas o
              perjuicios derivados del uso del servicio de transporte, salvo en
              casos de negligencia comprobada.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-3">
              8. Propiedad Intelectual
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Todos los derechos de propiedad intelectual sobre la aplicacion,
              incluyendo diseno, logotipos, marcas y contenido, pertenecen a
              EcotransGO. Esta prohibida su reproduccion sin autorizacion
              expresa.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-3">9. Modificaciones</h2>
            <p className="text-muted-foreground leading-relaxed">
              Nos reservamos el derecho de modificar estos terminos en cualquier
              momento. Los cambios seran notificados a traves de la aplicacion.
              El uso continuado del servicio despues de las modificaciones
              constituye aceptacion de los nuevos terminos.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-3">10. Contacto</h2>
            <p className="text-muted-foreground leading-relaxed">
              Para cualquier consulta sobre estos terminos, puede contactarnos
              en:
              <br />
              <span className="text-primary">soporte@ecotransgo.com</span>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
