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
          description: "중요한 공지사항을 확인하세요!",
          href: "/11"
        },
        {
          title: "이용약관",
          description: "건의 전 이용약관을 확인해보세요!",
          href: "/12"
        },
        {
          title: "릴리스 노트",
          description: "뭐가 업데이트됐는지 확인해보세요!",
          href: "/13"
        },
      ]
    },
    {
      title: "건의함",
      linkList: [
        {
          title: "건의함 홈",
          description: "건의사항에 관련한 모든 것을 확인하세요!",
          href: "/board/suggestions"
        },
        {
          title: "작성하기",
          description: "건의사항을 작성해보세요!",
          href: "/board/suggestions/create"
        },
        {
          title: "내가 올린 건의 사항",
          description: "지금까지 올린 건의사항들을 확인해보세요!",
          href: "/dashboard/my/suggestions"
        }
      ]
    },
    {
      title: "시험",
      linkList: [
        {
          title: "홈",
          description: "시험 관련 자료들을 확인하세요!",
          href: "/exam"
        },
        {
          title: "1학기 기말고사",
          description: "1학기 기말고사를 대비해보세요!",
          href: "/exam/1semester/final"
        },
        {
          title: "그외 시험",
          description: "그 외 시험들도 미리 확인해보세요!",
          href: "/exam/etc"
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
          href: "/terms"
        },
      ]
    },
    {
      title: "게시판",
      content: [
        {
          title: "건의함",
          href: "/board/suggestions"
        },
        {
          title: "공지사항",
          href: "/board/announcements"
        }
      ]
    },
    {
      title: "개발",
      content: [
        {
          title: "깃허브",
          href: "https://github.com/MicKoreaYoutube/mic-next-template"
        },
        {
          title: "릴리스 노트",
          href: "/releaseNote"
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
        href: "/board/suggestions"
      },
      {
        icon: ["fas", "message"],
        title: "건의하기",
        href: "/board/suggestions/create"
      },
      {
        icon: ["fas", "file"],
        title: "내가 쓴 건의사항",
        href: "/dashboard/my/suggestions"
      }
    ],
    [
      {
        icon: ["fas", "table-columns"],
        title: "대시보드",
        href: "/dashboard"
      },
      {
        icon: ["fas", "circle-info"],
        title: "내 정보",
        href: "/dashboard/my/information"
      },
      {
        icon: ["fas", "lock"],
        title: "비밀번호 수정",
        href: "/dashboard/my/change-pwd"
      }
    ],
    [
      {
        icon: ["fas", "right-from-bracket"],
        title: "로그아웃",
        href: "/auth/logout"
      }
    ]
  ]
}

export { siteConfig }

