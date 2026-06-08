import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ServiceJsonLd,
  FaqJsonLd,
  BreadcrumbJsonLd,
} from "@/components/seo/JsonLd";
import { ServiceLayout } from "@/components/service/ServiceLayout";
import { resolveMetadata } from "@/lib/seo";
import { services, getService } from "@/content/services";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return resolveMetadata({
    title: `${service.name} in Dallas–Fort Worth`,
    description: service.metaDescription,
    path: `/services/${service.slug}`,
  });
}

export default async function ServiceDetailPage({
  params,
}: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const path = `/services/${service.slug}`;

  return (
    <>
      <ServiceLayout service={service} path={path} />

      <ServiceJsonLd
        name={service.name}
        description={service.metaDescription}
        path={path}
      />
      <FaqJsonLd faqs={service.faqs} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: service.name, path },
        ]}
      />
    </>
  );
}
