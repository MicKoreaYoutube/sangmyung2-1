export type SiteConfig = typeof siteConfig

const siteConfig = {
  name: "상명중 2-1 건의함",
  description:
    "상명중학교 2학년 1반은 여러분의 건의로 완성됩니다. 언제나 편하게 건의해주세요!",
  mainNav: [
    {
      title: "Home",
      mainLink: {
        logo: true,
        title: "",
        description: "",
        href: "/"
      },
      linkList: [
        {
          title: "공지사항",
          href: "/11"
        },
        {
          title: "이용약관",
          href: "/12"
        },
        {
          title: "릴리스 노트",
          href: "/13"
        },
      ]
    },
    {
      title: "건의함",
      linkList: [
        {
          title: "건의함 홈",
          href: "/board/suggestions"
        },
        {
          title: "작성하기",
          href: "/board/suggestions/create"
        },
        {
          title: "내가 올린 건의 사항",
          href: "/dashboard/my/suggestions"
        }
      ]
    },
    {
      title: "문의하기",
      href: "/muneui"
    }
  ],
  footerContent: [
    {
      title: "법 관련",
      content: [
        {
          title: "이용 약관",
          href: "/11"
        },
      ]
    },
    {
      title: "게시판",
      content: [
        {
          title: "건의함",
          href: "/21"
        },
        {
          title: "공지사항",
          href: "/22"
        }
      ]
    },
    {
      title: "개발",
      content: [
        {
          title: "깃허브",
          href: "/31"
        },
        {
          title: "릴리스 노트",
          href: "/32"
        },
      ]
    },
  ],
  FamilySurvice: [
    {
      name: "1번 서비스",
      href: "/1s"
    },
    {
      name: "2번 서비스",
      href: "/2s"
    },
    {
      name: "3번 서비스",
      href: "/3s"
    }
  ],
  links: {
    shadcnTwitter: "https://twitter.com/shadcn",
    shadcnGithub: "https://github.com/shadcn/ui",
    shadcnuiDocs: "https://ui.shadcn.com",
    micInstagram: "https://instagram.com/leejunsibal",
    micGithub: "https://github.com/MicKoreaYoutube/mic-next-template"
  },
  docsSidebarContent: [
    {
      title: "1번줄",
      content: [
        {
          title: "11번 내용",
          doc: "<p className='text-2xl'>시발</p>",
          chapter: ["test1", "test2", "test3"]
        },
        {
          title: "12번 내용",
        },
        {
          title: "13번 내용",
        }
      ]
    },
    {
      title: "2번줄",
      href: true,
      content: [
        {
          title: "21번 내용",
        },
        {
          title: "22번 내용",
        },
        {
          title: "23번 내용",
        }
      ]
    },
    {
      title: "3번줄",
      content: [
        {
          title: "31번 내용",
        },
        {
          title: "32번 내용",
        },
        {
          title: "33번 내용",
          doc: "와 개 좆같다 ㄹㅇ"
        }
      ]
    },
    {
      title: "4번줄",
      href: true,
      doc: "<div className='h-full bg-red-500 text-2xl font-KBO-Dia-Gothic_bold' id='chapter-test1'>무적 LG!</div>",
      chapter: ["test1", "test2", "test3"]
    },
    {
      title: "5번줄",
      content: [
        {
          title: "51번 내용",
        },
        {
          title: "52번 내용",
        },
        {
          title: "53번 내용",
        }
      ]
    },
  ],
}

if (siteConfig.mainNav[0].mainLink) {
  siteConfig.mainNav[0].mainLink.title = siteConfig.name
  siteConfig.mainNav[0].mainLink.description = siteConfig.description
}

import { dashboardSidebarItem } from "@/types/sidebar"
import { dropDownItem } from "@/types/dropdown"

export const dashboardSidebarContent: dashboardSidebarItem[] = [
  {
    icon: ["fas", "house"],
    title: "대시보드",
    href: "/dashboard"
  },
  {
    icon: ["fas", "circle-info"],
    title: "내 정보",
    content: [
      {
        icon: ["fas", "person"],
        title: "개인 정보",
        href: "/dashboard/my/information"
      },
      {
        icon: ["fas", "file"],
        title: "내가 쓴 건의사항",
        href: "/dashboard/my/suggestions"
      },
      {
        icon: ["fas", "lock"],
        title: "비밀번호 수정",
        href: "/dashboard/my/change-pwd"
      },
    ]
  }
]

export const navDropDownContent: dropDownItem = {
  label: "My Account",
  content: [
    [
      {
        icon: ["fas", "box-archive"],
        title: "건의함",
        href: "/board/suggestions",
        shortcut: ""
      },
      {
        icon: ["fas", "message"],
        title: "건의하기",
        href: "/board/suggestions/create",
        shortcut: ""
      },
      {
        icon: ["fas", "file"],
        title: "내가 쓴 건의사항",
        href: "/dashboard/my-suggestions",
        shortcut: ""
      }
    ],
    [
      {
        icon: ["fas", "table-columns"],
        title: "대시보드",
        href: "/dashboard",
        shortcut: ""
      },
      {
        icon: ["fas", "circle-info"],
        title: "내 정보",
        href: "/dashboard/my/information",
        shortcut: ""
      },
      {
        icon: ["fas", "lock"],
        title: "비밀번호 수정",
        href: "/dashboard/change-pwd",
        shortcut: ""
      }
    ],
    [
      {
        icon: ["fas", "right-from-bracket"],
        title: "로그아웃",
        href: "/auth/logout",
        shortcut: ""
      }
    ]
  ]
}

export { siteConfig }

