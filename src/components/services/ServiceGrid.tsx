import { services } from '@/data/services'
import ServiceCard from './ServiceCard'

export default function ServiceGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((service, i) => (
        <ServiceCard key={service.slug} service={service} index={i} />
      ))}
    </div>
  )
}
