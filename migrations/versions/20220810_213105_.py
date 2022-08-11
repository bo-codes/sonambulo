"""empty message

Revision ID: 3666040fa09d
Revises: 426d270c59ae
Create Date: 2022-08-10 21:31:05.396324

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '3666040fa09d'
down_revision = '426d270c59ae'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('user_posts')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('user_posts',
    sa.Column('user_id', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.Column('post_id', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.ForeignKeyConstraint(['post_id'], ['posts.id'], name='user_posts_post_id_fkey'),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name='user_posts_user_id_fkey'),
    sa.PrimaryKeyConstraint('user_id', 'post_id', name='user_posts_pkey')
    )
    # ### end Alembic commands ###
