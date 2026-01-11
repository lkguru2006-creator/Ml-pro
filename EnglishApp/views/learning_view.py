import flet as ft

class LearningView(ft.Container):
    def __init__(self):
        super().__init__()
        self.expand = True
        self.padding = 30
        self.content = ft.Column(
            controls=[
                ft.Text("Learning Modules", size=32, weight=ft.FontWeight.BOLD),
                ft.Text("Select a course to start.", size=16, color=ft.Colors.GREY_500),
                ft.Divider(height=20, color=ft.Colors.TRANSPARENT),
                ft.Row(
                    wrap=True,
                    spacing=20,
                    run_spacing=20,
                    controls=[
                        self.build_course_card("Basic Grammar", "Master the tenses and basic sentence structures.", "abc", ft.Colors.BLUE),
                        self.build_course_card("Vocabulary Builder", "Learn 1000 essential words.", "book", ft.Colors.ORANGE),
                        self.build_course_card("Business English", "Email etiquette and meeting phrases.", "business_center", ft.Colors.PURPLE),
                    ]
                )
            ]
        )

    def build_course_card(self, title, desc, icon, color):
        return ft.Container(
            width=250,
            height=180,
            padding=20,
            bgcolor=ft.Colors.WHITE,
            border_radius=15,
            shadow=ft.BoxShadow(blur_radius=10, color="#1A000000"),
            content=ft.Column(
                alignment=ft.MainAxisAlignment.SPACE_BETWEEN,
                controls=[
                    ft.Icon(icon, size=40, color=color),
                    ft.Text(title, size=18, weight=ft.FontWeight.BOLD),
                    ft.Text(desc, size=12, color=ft.Colors.GREY_600),
                    ft.ElevatedButton("Start", bgcolor=color, color=ft.Colors.WHITE)
                ]
            )
        )
