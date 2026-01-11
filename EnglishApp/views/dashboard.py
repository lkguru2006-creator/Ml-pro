import flet as ft
from datetime import datetime

class DashboardView(ft.Container):
    def __init__(self):
        super().__init__()
        print("Initializing DashboardView...")
        self.expand = True
        self.padding = 30
        self.content = ft.Column(
            controls=[
                self.build_header(),
                ft.Text("Recent Activity TEST", size=20, weight=ft.FontWeight.BOLD),
            ],
            scroll=ft.ScrollMode.AUTO,
        )
        print("DashboardView content set.")

    def build_header(self):
        now = datetime.now()
        hour = now.hour
        if hour < 12:
            greeting = "Good Morning"
        elif 12 <= hour < 17:
            greeting = "Good Afternoon"
        else:
            greeting = "Good Evening"
            
        return ft.Row(
            alignment=ft.MainAxisAlignment.SPACE_BETWEEN,
            controls=[
                ft.Column(
                    spacing=5,
                    controls=[
                        ft.Text(f"{greeting}, Learner!", size=32, weight=ft.FontWeight.BOLD),
                        ft.Text(f"Today is {now.strftime('%A, %d %B %Y')}", size=16, color=ft.Colors.GREY_500),
                    ]
                ),
                ft.CircleAvatar(
                    content=ft.Icon("person"),
                    radius=25,
                    bgcolor=ft.Colors.INDIGO_100,
                    color=ft.Colors.INDIGO,
                )
            ]
        )

    def build_stats_row(self):
        return ft.Row(
            spacing=20,
            controls=[
                self.build_stat_card("Daily Streak", "12 Days", "whatshot", ft.Colors.ORANGE),
                self.build_stat_card("Tasks Done", "8/10", "task_alt", ft.Colors.GREEN),
                self.build_stat_card("Time Spent", "45m", "access_time", ft.Colors.BLUE),
            ]
        )

    def build_stat_card(self, title, value, icon, color):
        return ft.Container(
            expand=True,
            padding=20,
            bgcolor=ft.Colors.WHITE,
            border_radius=15,
            shadow=ft.BoxShadow(
                blur_radius=10,
                color="#1A000000",
                offset=ft.Offset(0, 4)
            ),
            content=ft.Column(
                controls=[
                    ft.Icon(icon, color=color, size=30),
                    ft.Text(value, size=24, weight=ft.FontWeight.BOLD),
                    ft.Text(title, size=14, color=ft.Colors.GREY_600),
                ]
            )
        )

    def build_activity_list(self):
        # Placeholder for activity
        return ft.Container(
            padding=20,
            bgcolor=ft.Colors.WHITE,
            border_radius=15,
            shadow=ft.BoxShadow(
                blur_radius=10,
                color="#1A000000",
                offset=ft.Offset(0, 4)
            ),
            content=ft.Column(
                controls=[
                    ft.ListTile(
                        leading=ft.Icon("check_circle", color=ft.Colors.GREEN),
                        title=ft.Text("Completed 'Present Continuous'"),
                        subtitle=ft.Text("10 mins ago"),
                    ),
                    ft.ListTile(
                        leading=ft.Icon("bookmark", color=ft.Colors.BLUE),
                        title=ft.Text("Added 5 new words to vocabulary"),
                        subtitle=ft.Text("1 hour ago"),
                    ),
                ]
            )
        )
