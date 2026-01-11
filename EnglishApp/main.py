import flet as ft
from views.dashboard import DashboardView
from views.tasks_view import TasksView
from views.learning_view import LearningView

def main(page: ft.Page):
    # Window setup
    page.title = "English Mastery"
    page.window_width = 1000
    page.window_height = 800
    page.window_min_width = 800
    page.window_min_height = 600
    
    # Theme Setup
    page.theme_mode = ft.ThemeMode.LIGHT
    page.theme = ft.Theme(
        color_scheme_seed=ft.Colors.INDIGO,
        visual_density=ft.VisualDensity.COMFORTABLE,
    )

    # Views Cache
    _views_cache = {}

    def get_view(index):
        if index not in _views_cache:
            if index == 0:
                _views_cache[0] = DashboardView()
            elif index == 1:
                _views_cache[1] = TasksView()
            elif index == 2:
                _views_cache[2] = LearningView()
        return _views_cache.get(index, _views_cache.get(0))

    def on_nav_change(e):
        selected_index = e.control.selected_index
        content_area.content = get_view(selected_index)
        content_area.update()
    
    # Navigation Rail (Sidebar)
    rail = ft.NavigationRail(
        selected_index=0,
        label_type=ft.NavigationRailLabelType.ALL,
        min_width=100,
        min_extended_width=400,
        on_change=on_nav_change,
        destinations=[
            ft.NavigationRailDestination(
                icon="dashboard_outlined", 
                selected_icon="dashboard", 
                label="Dashboard"
            ),
            ft.NavigationRailDestination(
                icon="task_alt_outlined", 
                selected_icon="task_alt", 
                label="Daily Tasks"
            ),
            ft.NavigationRailDestination(
                icon="book_outlined", 
                selected_icon="book", 
                label="Learning"
            ),
        ],
    )

    # Content Area - Initially showing Dashboard
    content_area = ft.Container(
        expand=True,
        padding=0,
        content=get_view(0),
        bgcolor=ft.Colors.BLUE_50, # Light blue background to see if it's rendered
    )

    # Layout
    page.padding = 0
    page.spacing = 0
    
    main_layout = ft.Row(
        [
            rail,
            ft.VerticalDivider(width=1),
            content_area,
        ],
        expand=True,
        spacing=0,
    )
    
    page.add(main_layout)
    print("Page layout added.")
    page.update()

if __name__ == "__main__":
    ft.run(main)
