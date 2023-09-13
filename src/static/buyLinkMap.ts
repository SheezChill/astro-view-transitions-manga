import Mp from './icons/mp.svg?raw'
import Ebj from './icons/ebj.svg?raw'
import Cdj from './icons/cdj.svg?raw'
import Bw from './icons/bw.svg?raw'
import Amz from './icons/amz.svg?raw'

export const buyLinkMap: Record<string, { label: string; icon: string }> = {
  raw: {
    label: 'Official Raw',
    icon: ''
  },
  engtl: {
    label: 'Official English',
    icon: Mp
  },
  bw: {
    label: 'Book☆Walker',
    icon: Bw
  },
  ebj: {
    label: 'eBookJapan',
    icon: Ebj
  },
  cdj: {
    label: 'CDJapan',
    icon: Cdj
  },
  amz: {
    label: 'Amazon',
    icon: Amz
  }
}
